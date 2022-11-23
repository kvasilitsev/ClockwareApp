const emailService = require("../services/email.services");

const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

async function sendEmail(req, res) {  
    const { email } = req.body;  
    try {
        const send_to = email;
        const sent_from = process.env.EMAIL_USER;        
        const subject = "Clockware order confirmation";
        const message = `
            <h3>Hello!</h3>
            <p>Thank you for your order!</p>
            <p>Best regards, Clockware</p>
        `;   
        await emailService(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: "Email Sent" });
      } catch (error) {
        res.status(500).json(error.message);
      }
  };

module.exports = sendEmail;

  