const express = require("express");
const router = express.Router();
const { register, login, logout, uploadImage, getuser,forgotpassword,resetpassword } = require("../controller/auth");
const { getAccessToToken } = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/upload/profileImageUpload");

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', getAccessToToken, getuser);
router.post('/upload', [getAccessToToken, profileImageUpload.array("profile_image", 4)], uploadImage);
router.post('/forgotpassword',forgotpassword);
router.put('/resetpassword', resetpassword);

module.exports = router;