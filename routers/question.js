const express = require("express");
const router = express.Router();
const { getAllQuestions, getOneQuesiton, askNewQuestion, editQuestion, deleteQuestion } = require("../controller/question");
const { getAccessToToken, getQuestionsOwnerAccess } = require("../middlewares/authorization/auth");
const { checkQuestionExist } = require("../middlewares/database/databaseErrorHelpers");

router.get('/', getAllQuestions);
router.get('/:id', checkQuestionExist, getOneQuesiton);
router.post('/askQuestion', getAccessToToken, askNewQuestion);
router.put('/:id/edit', [getAccessToToken, checkQuestionExist, getQuestionsOwnerAccess], editQuestion);
router.delete('/:id/delete', [getAccessToToken, checkQuestionExist, getQuestionsOwnerAccess], deleteQuestion);



module.exports = router;