const sgMail = require("@sendgrid/mail");
const Mailjet = require("node-mailjet");
const { generateMagicToken } = require("../../middleware/authorizations");
const constant = require("./constant");

const { senderMailId, mailKey } = require("./constant");

const sendMailToUserSignup = async (to, subject, message) => {
  sgMail.setApiKey(mailKey);
  const msg = {
    to: to,
    from: senderMailId,
    subject: subject,
    html: message,
  };
  let info = await sgMail.send(msg);
  return true;
};

module.exports = {
  sendMailToUserSignup,
};
