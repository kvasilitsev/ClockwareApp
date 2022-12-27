const Router = require('express');
const router = new Router();
const sendEmail = require("../../controllers/email.controller")

router.post("/sendEmail", sendEmail);

module.exports = router;
