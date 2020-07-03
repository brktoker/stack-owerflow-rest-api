const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');
const Question = require("../models/Question");
const Answer = require("../models/Answer");

const addAnswerToQuestion = asyncErrorHandler(async (req, res, next) => {
    const { question_id } = req.params;
    const user_id = req.user.id;
    const information = req.body;

    const answer = await Answer.create({
        ...information,
        user: user_id,
        question: question_id
    });

    res.status(200).json({
        success: true,
        data: answer
    });

});

const getAllAnswers = asyncErrorHandler(async (req, res, next) => {

    const { question_id } = req.params;

    const question = await Question.findById(question_id).populate("answers");

    const answers = question.answers;

    res.status(200).json({
        success: true,
        data: answers
    });
});

const getSingleAnswer = asyncErrorHandler(async (req, res, next) => {

    const { answer_id } = req.params;

    const answer = await Answer
        .findById(answer_id)
        .populate({
            path: "question",
            select: "title"
        })
        .populate({
            path: "user",
            select: "name"
        });

    res.status(200).json({
        success: true,
        data: answer
    });
});


module.exports = { addAnswerToQuestion, getAllAnswers, getSingleAnswer };