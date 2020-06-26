const User = require('../models/User');
const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');


const adminPage = asyncErrorHandler(async (req, res, next) => {

    res.status(200).json({
        success: true,
        message: "Admin Page"
    })
});

const blockUser = asyncErrorHandler(async (req, res, next) => {
    
    const {id} = req.params;

    const user = await User.findById(id);
    
    user.blocked = !user.blocked;
    await user.save();

    return res.status(200).json({
        success : true,
        message : "This user blocked - unblocked"
    });
});

module.exports = { adminPage,blockUser };