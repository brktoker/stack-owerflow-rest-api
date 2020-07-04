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

const updateAnswer = asyncErrorHandler(async (req, res, next) => {
    const { answer_id } = req.params;
    const information = req.body;

    const answer = await Answer.findByIdAndUpdate(answer_id, information, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: answer
    });
});

const deleteAnswer = asyncErrorHandler(async (req, res, next) => {
    const { answer_id } = req.params;
    const { question_id } = req.params;

    await Answer.findByIdAndRemove(answer_id);
    
    // question in answer delete
    const question = await Question.findById(question_id);
    question.answers.splice(question.answers.indexOf(answer_id), 1);
    await question.save();
    //

    return res.status(200).json({
        success: true,
        message: "Answer has been deleted"
    });

});


module.exports = { addAnswerToQuestion, getAllAnswers, getSingleAnswer, updateAnswer, deleteAnswer };