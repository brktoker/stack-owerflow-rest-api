const express = require("express");
const router = express.Router();
const { getSingleUser } = require("../controller/user");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");

router.get('/:id', checkUserExist, getSingleUser)


module.exports = router

