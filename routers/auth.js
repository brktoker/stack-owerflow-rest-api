const express = require("express")
const router = express.Router()
const { register,login,logout, getuser } = require("../controller/auth")
const {getAccessToToken} = require("../middlewares/authorization/auth")


router.post('/register', register)
router.post('/login', login)
router.get('/logout',logout)
router.get('/profile',getAccessToToken, getuser)

module.exports = router