const express = require("express");
const router = express.Router();
const { askNewQuestion } = require("../controller/question");
const { getAccessToToken} = require("../middlewares/authorization/auth");

router.post('/askQuestion',getAccessToToken, askNewQuestion);


module.exports = router;