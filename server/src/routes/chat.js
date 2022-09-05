const express = require('express');
const messagesController = require("../controllers/messagesController");

const router = express.Router();

router.post("/sendmsg/", messagesController.addMessage);
router.post("/getmsg/", messagesController.getMessages);

module.exports = router;