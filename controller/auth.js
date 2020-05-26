const User = require('../models/User')
const CustomError = require('../helpers/errors/CustomError')
const asyncErrorHandler = require('express-async-handler')
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers')
const { validateUserInput, compareInputs } = require('../helpers/input/inputHelpers')

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
}

module.exports = { register, login, logout, uploadImage, getuser }