
const User = require("../model/User");
const constant = require("../services/constant");
const { userSignupModel, userSignupServices } = require("../services/authServices");
const { sendMailToUserSignup } = require("../services/mailService");
const { validateSignUpRequest } = require("../services/taskServices");


const userRegister = async (req, res) => {

  console.log(" userRegister controller ",req.body);
  const { ...rest } = req.body;
  try {
    let error = validateSignUpRequest(req.body)

    if(Object.keys(error).length > 0){
      return res.status(400).json({status:constant.status.error, message:'Invalid or extra parameter is passed', data:error})
    }
      // -----------------------------   NORMAL SIGNUP BY EMAIL AND PASSWORD ---------------------------- 
        let validateUser = await User.findOne({ email: rest.email });
        if (validateUser) {
          return res.status(403).json({status:constant.status.error, message: constant.message.signupexisterror, data:{}})

        } else {
          let data = await userSignupModel(rest)
         req.session.data = rest ? rest.email : "";
         let creatUserRes =  await User.create(data);
        
        if(creatUserRes){  
          let message = `Your Otp : ${data.otp}`;
          let subject = `Welcome Verification `;
          await sendMailToUserSignup(rest.email, subject, message) // send mail to verify user

          let userDetails =  await userSignupServices(res,rest.email)
         
          return res.json({status:constant.status.success, message:"user signup sucessfuly  ", data:userDetails})
        }else{
          return res.status(403).json({status:constant.status.error, message: constant.message.notinserted, data:{}})
        }
        }    
  } catch (error) {
    console.log("userRegister register register error ...",error);
    return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
  }
};

const validateOtp = async (req, res) => {

  console.log(" validateOtp controller ",req.body);
  const { email, userId } = req.user;
  try {

    if(Object.keys(req.body).length === 0){    
      return res.status(204).json({status:constant.status.error, message:" Empty request ", data:{}})
    }

      // -----------------------------   Otp validadate and return  ---------------------------- 
        let validateUser = await User.findOne({ email: email });
        if (validateUser) {
          let userDetails =  await userSignupServices(res,email)
          return res.status(403).json({status:constant.status.suce, message: constant.message.getdatasucess, data:userDetails})
        }    
  } catch (error) {
    console.log("validateOtp api ...",error);
    return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
  }
};





module.exports = {
  userRegister,
  validateOtp


};
