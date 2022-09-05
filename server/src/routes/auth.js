const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/allusers/:id", userController.getAllUsers);
router.get("/searchusers/:q",userController.searchUsers)
router.post("/setavatar/:id", userController.setAvatar);
router.get("/logout/:id", userController.logOut);

module.exports = router;