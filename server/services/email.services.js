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

module.exports = emailService;