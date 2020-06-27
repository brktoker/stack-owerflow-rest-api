const User = require('../../models/User');
const CustomError = require('../../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');


const checkUserExist = asyncErrorHandler(async (req, res, next) => {
    
    const { id } = req.params;
    console.log(id)
    const user = await User.findById(id);

    if (!user || user == null) {
        return next(new CustomError("User not found", 400));
    }
    next();
});

module.exports = { checkUserExist }


