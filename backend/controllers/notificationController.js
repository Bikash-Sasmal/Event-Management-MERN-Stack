const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmailNotification = (email, subject, message) => {
  const transporter = nodemailer.createTransport({
   service: 'gmail',
           
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
