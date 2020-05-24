const User = require('../models/User')

const register = async (req, res, next) => {
    const name = "burak"
    const email = "ahmet@tokerbebe.com"
    const password = "12345"

    try {
        const user = await User.create({
            name,
            email,
            password
        })

        res.status(200).json({
            success: true,
            user: user
        })
    }
    catch (err) {
        return next(err)
    }

}


module.exports = { register }