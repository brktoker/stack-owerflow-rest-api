const User = require('../models/User');
const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');

const getSingleUser = asyncErrorHandler(async (req, res, next) => {

    const { id } = req.params;
    const user = await User.findById(id)

    res.status(200).json({
        success: true,
        data: user
    })
});

module.exports = { getSingleUser };