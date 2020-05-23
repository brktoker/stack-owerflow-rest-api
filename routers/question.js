const express = require("express")
const router = express.Router()
const { getAllQuestions } = require("../controller/question")

router.get('/', getAllQuestions)


module.exports = router