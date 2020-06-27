const express = require("express");
const router = express.Router();
const { adminPage, blockUser, deleteUser } = require('../controller/admin');
const { getAccessToToken, getAdminAccess } = require("../middlewares/authorization/auth");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");


router.use([getAccessToToken, getAdminAccess]);
router.get('/', adminPage);
router.get('/block/:id', blockUser);
router.delete('/delete/:id',deleteUser);



module.exports = router;