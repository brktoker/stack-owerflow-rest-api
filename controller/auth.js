const User = require('../models/User')
const CustomError = require('../helpers/errors/CustomError')
const asyncErrorHandler = require('express-async-handler')
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers')
const { validateUserInput, compareInputs } = require('../helpers/input/inputHelpers')
const sendEmail = require('../helpers/mail/sendEmail')
const register = asyncErrorHandler(async (req, res, next) => {

    const user = await User.create(req.body);
    sendJwtToClient(user, res)
});

const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!validateUserInput(email, password)) {
        return next(new CustomError("Please check your inputs", 400))
    }
    const user = await User.findOne({ email }).select("+password")

    if (!compareInputs(password, user.password)) {
        return next(new CustomError("Please check your credentials", 400))
    }

    sendJwtToClient(user, res)
});
const uploadImage = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_image": req.savedProfileImage
    }, { new: true })
    res.status(200)
        .json({
            success: true,
            message: "Upload İmage Successfull",
            data: user
        })
})
const logout = asyncErrorHandler(async (req, res, next) => {

    return res.status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Logouth Successful"
        })
});

const getuser = (req, res, next) => {
    res.json({
        status: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })
};

const forgotpassword = asyncErrorHandler(async (req, res, next) => {

    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail });
    if (!user) {
        return next(new CustomError("There is no user with that email", 400))
    }

    const resetPasswordToken = await user.getResetPasswordTokenFromUser()

    await user.save();

    const resetPasswordUrl = `http://localhost:8080/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
    <h3>Reset Your Password </h3>
    <p> This <a href ='${resetPasswordUrl}' target = '_blank'>link </a> will expire 1 hour </p>
    `;
    try {
        //successful testing working
        console.log(process.env.SMTP_USER)
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset Your Password",
            html: emailTemplate
        });
        return res.status(200)
            .json({
                success: true,
                message: "Reset mail sent your email"
            })
    }
    catch {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresIn = undefined;
        await user.save();
        return next(new CustomError("Email Could Not Be Send", 500));
    }
});

const resetpassword = asyncErrorHandler(async (req, res, next) => {
    const { resetPasswordToken } = req.query
    const password = req.body.password
    if (!resetPasswordToken) {
        return next(new CustomError("Please provide a valid token", 400))
    }
    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpiresIn: { $gt: Date.now() }
    })
    if (!user) {
        return next(new CustomError("invalid token or session", 400))
    }
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresIn = undefined
    await user.save()
    res.status(200).json({
        succes: true,
        message: "Password reset succesfull"
    })

});
module.exports = { register, login, logout, uploadImage, getuser, forgotpassword, resetpassword }