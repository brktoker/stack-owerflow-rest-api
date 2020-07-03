const User = require('../../models/User');
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');
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

    const question_id = req.params.id || req.params.question_id;
    const user = await Question.findById(question_id);

    if (!user || user == null) {
        return next(new CustomError("Question not found", 400));
    }
    next();
});

const checkQuestionAndAnswerExist = asyncErrorHandler(async (req, res, next) => {

    const question_id = req.params.question_id;
    const answer_id = req.params.answer_id;

    const answer = await Answer.findOne({
        _id: answer_id,
        question: question_id
    });

    if (!answer || answer == null) {
        return next(new CustomError("No answer for this question found ", 400));
    }
    next();
});

module.exports = { checkUserExist, checkQuestionExist, checkQuestionAndAnswerExist }


