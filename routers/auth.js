const express = require("express")
const router = express.Router()
const { register } = require("../controller/auth")

router.get('/', register)

module.exports = router