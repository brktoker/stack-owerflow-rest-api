const express = require("express");
const router = express.Router();
const { adminPage, blockUser } = require('../controller/admin');
const { getAccessToToken, getAdminAccess } = require("../middlewares/authorization/auth");


router.use([getAccessToToken, getAdminAccess]);
router.get('/', adminPage);
router.get('/block/:id',blockUser);



module.exports = router;