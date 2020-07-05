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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = await Question.countDocuments();
    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    const regex = new RegExp(req.query.search, "i");
    const questinons = await Question.find()
        .where({
            title: regex
        })
        .populate("user")
        .populate("answers")
        .skip(startIndex)
        .limit(limit);

    return res.status(200).json({
        success: true,
        pagination: pagination,
        data: questinons,
        count: questinons.length
    });
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