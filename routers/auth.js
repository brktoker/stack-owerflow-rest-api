const express = require("express")
const router = express.Router()
const { register, getuser } = require("../controller/auth")
const {getAccessToToken} = require("../middlewares/authorization/auth")
router.post('/register', register)
router.get('/profile',getAccessToToken, getuser)

module.exports = router