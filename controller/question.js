const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');
const Question = require("../models/Question");

const askNewQuestion = asyncErrorHandler(async (req, res, next) => {
    const information = req.body;

    const question = await Question.create({
        ...information, // all data with one step add
        user: req.user.id
    });

    return res.status(200).json({
        success: true,
        data: question
    });
});

const getAllQuestions = asyncErrorHandler(async (req, res, next) => {

    return res.status(200).json(res.queryResults);
});

const getOneQuesiton = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const question = await Question.findById(id);
    return res.status(200).json({
        success: true,
        data: question
    });
});

const editQuestion = asyncErrorHandler(async (req, res, next) => {
    const quesionId = req.params.id;
    const information = req.body;
    const question = await Question.findByIdAndUpdate(quesionId, information, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        data: question
    });
});

const deleteQuestion = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    await Question.findOneAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Question has been deleted"
    });
});

module.exports = { askNewQuestion, getAllQuestions, getOneQuesiton, editQuestion, deleteQuestion };