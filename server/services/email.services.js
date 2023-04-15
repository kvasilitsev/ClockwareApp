const nodemailer = require("nodemailer");
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

const emailService = async (subject, message, send_to, sent_from) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',    
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },   
  });

  const options = {
    from: sent_from,
    to: send_to,    
    subject: subject,
    html: message,
  };  

  transporter.sendMail(options, function (err, info) {
    if (err) {
      logger.error(err);
    } else {
      logger.info('succes');
    }
  });
};

async function sendEmail(email) { 
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
    } catch (error) {
      logger.error(error);
    }
};

module.exports = sendEmail;