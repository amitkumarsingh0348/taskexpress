const sgMail = require("@sendgrid/mail");
const Mailjet = require("node-mailjet");
const nodemailer = require("nodemailer");
const { generateMagicToken } = require("../../middleware/authorizations");
const constant = require("./constant");



const sendMailToUserSignup = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amitkumarsingh700404@gmail.com',
        pass: 'qigrvopdafntdslg'
    },
    secure:false
});

    let info = await transporter.sendMail({
      from: "amitkumarsingh700404@gmail.com", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: "Hello world?", // plain text body
      html:  message, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = {
  sendMailToUserSignup,
};
