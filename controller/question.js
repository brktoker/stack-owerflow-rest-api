const CustomError = require('../helpers/errors/CustomError');
const asyncErrorHandler = require('express-async-handler');
const Question = require("../models/Question");

const askNewQuestion = asyncErrorHandler(async (req, res, next) => {
    const information = req.body;

    const question = await Question.create({
        ...information, // all data with one step add
        user: req.user.id
    });

    res.status(200).json({
        success: true,
        data : question
    });
});

module.exports = { askNewQuestion };