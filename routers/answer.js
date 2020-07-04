const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAccessToToken, getAnswersOwnerAccess } = require("../middlewares/authorization/auth");
const { checkQuestionAndAnswerExist } = require("../middlewares/database/databaseErrorHelpers");
const { addAnswerToQuestion, getAllAnswers, getSingleAnswer, updateAnswer, deleteAnswer } = require("../controller/answer");

router.post('/', getAccessToToken, addAnswerToQuestion);
router.get('/', getAllAnswers);
router.get('/:answer_id', checkQuestionAndAnswerExist, getSingleAnswer);
router.put('/:answer_id', [getAccessToToken, checkQuestionAndAnswerExist, getAnswersOwnerAccess], updateAnswer);
router.delete('/:answer_id',[getAccessToToken, checkQuestionAndAnswerExist, getAnswersOwnerAccess],deleteAnswer);
module.exports = router;