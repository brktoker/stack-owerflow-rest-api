const User = require('../models/User')
const asyncErrorHandler = require('express-async-handler')
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers')
const register = asyncErrorHandler(async (req, res, next) => {

    const user = await User.create(req.body);
    sendJwtToClient(user,res)
});

const getuser = (req,res,next) => {
    res.json({
        status : true,
        data : {
            id : req.user.id,
            name : req.user.name
        }
    })
}

module.exports = { register,getuser }