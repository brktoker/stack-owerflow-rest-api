const User = require('../models/User')
const asyncErrorHandler = require('express-async-handler')

const register = asyncErrorHandler(async (req, res, next) => {
    const name = "burak"
    const email = "ahmet@tokerbebe.com"
    const password = "12345"


    const user = await User.create({
        name,
        email,
        password
    })

    res.status(200).json({
        success: true,
        user: user
    })
});


module.exports = { register }