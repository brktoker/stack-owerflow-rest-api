const User = require('../../models/User');
const Question = require('../../models/Question');
const CustomError = require('../../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');


const checkUserExist = asyncErrorHandler(async (req, res, next) => {

    const { id } = req.params;
    const user = await User.findById(id);

    if (!user || user == null) {
        return next(new CustomError("User not found", 400));
    }
    next();
});

const checkQuestionExist = asyncErrorHandler(async (req, res, next) => {

    const { id } = req.params;
    const user = await Question.findById(id);

    if (!user || user == null) {
        return next(new CustomError("Question not found", 400));
    }
    next();
});

module.exports = { checkUserExist, checkQuestionExist }


