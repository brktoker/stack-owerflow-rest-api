const express = require("express")
const router = express.Router()
const { register, login, logout, uploadImage, getuser } = require("../controller/auth")
const { getAccessToToken } = require("../middlewares/authorization/auth")
const profileImageUpload = require("../middlewares/upload/profileImageUpload")

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/profile', getAccessToToken, getuser)
router.post('/upload', [getAccessToToken, profileImageUpload.array("profile_image", 4)], uploadImage)

module.exports = router