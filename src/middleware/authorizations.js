const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("../api/model/User");
const constant = require("../api/services/constant");

const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.json({ message: constant.message.jwtAuthFailed });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, constant.userJwtSecret);
    let validateUser = await User.findOne({ email: payload.email });
    if (validateUser) {
      req.user = {
        email: validateUser.email,
        role:validateUser.role,
        userId: validateUser._id,
      };
      console.log(req.user);
      next();
    } else {
      return res.json({ message: "Authentication invalid ! Please register" });
    }
  } catch (error) {
    console.log("invalid signature");
    return res.json({ message: "Authentication invalid" });
  }
};

const generateAccessToken = async (data) => {
  data.sub = '1234567890'
  data.exp = Math.floor(Date.now() / 1000) + (60 * 60)
  return jwt.sign(data, constant.userJwtSecret);
};



const userOtpValidate = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  console.log("authHeader");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.json({ message: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, constant.userJwtSecret);
    let validateUser = await User.findOne({ email: payload.email });

    if (validateUser) {
  // validate otp with 30 ms 
  if (validateUser.otp !== req.body.otp) {
    return res.json({ message: "Invalid otp" });
  }
  var now = moment().utc().format('Y-MM-DD HH:mm:ss.SSS Z');
  var prev = moment(validateUser.updatedAt).utc().format('Y-MM-DD HH:mm:ss.SSS Z')
  var result = moment(now,'Y-MM-DD HH:mm:ss.SSS Z').diff(moment(prev,'Y-MM-DD HH:mm:ss.SSS Z'), 'seconds')
  // Validate otp in 30 sec 
  if (result < 30) {
    return res.json({ message: " otp time extendp" });
  }
  let updateData = { verified : true}
   await User.updateOne({_id:validateUser._id},{$set:updateData},{ upsert: true })
      req.user = {
        email: validateUser.email,
        role:validateUser.role,
        userId: validateUser._id,
      };
      console.log(req.user);
      next();
    } else {
      return res.json({ message: "Authentication invalid ! Please register" });
    }
  } catch (error) {
    console.log("invalid signature");
    return res.json({ message: "Authentication invalid" });
  }
};
module.exports = {
  generateAccessToken,
  verify,
  userOtpValidate
};
