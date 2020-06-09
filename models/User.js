const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a user"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlength: [6, "Please provide a wiht min lenght 6"],
        required: [true, "Please provide a password"],
        select: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpiresIn : {
        type : Date
    }
});
userSchema.methods.generateJwtFromUser = (user) => {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env
    const payload = {
        id: user._id,
        name: user.name
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE })

    return token;
};
userSchema.methods.getResetPasswordTokenFromUser = function(){
    const rondomHexString = crypto.randomBytes(15).toString("hex")

    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(rondomHexString)
    .digest("hex");

    this.resetPasswordToken = resetPasswordToken
    this.resetPasswordExpiresIn = Date.now() + 3600000 // one hour expire date
    
    return resetPasswordToken;
};
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash
            next();
        });
    });
});

module.exports = mongoose.model("User", userSchema)