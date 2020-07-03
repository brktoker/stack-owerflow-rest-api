const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAccessToToken } = require("../middlewares/authorization/auth");
const { checkQuestionAndAnswerExist } = require("../middlewares/database/databaseErrorHelpers");
const { addAnswerToQuestion, getAllAnswers, getSingleAnswer } = require("../controller/answer");

router.post('/', getAccessToToken, addAnswerToQuestion);
router.get('/', getAllAnswers);
router.get('/:answer_id',checkQuestionAndAnswerExist, getSingleAnswer)
module.exports = router;