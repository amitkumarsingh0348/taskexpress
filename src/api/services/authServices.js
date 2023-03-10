
const constant = require("./constant");
const { generateAccessToken } = require("../../middleware/authorizations");
const User = require("../model/User");

const validateUser = async(user,res) => {
    if( user.role !== constant.roles.admin){
        return res.json({status:constant.status.error, message:constant.message.notAccesRight, data:{}})
      }else return true
  }

  const otpServices = () =>{
    return Math.floor(100000 + Math.random() * 900000) 
  }

  const userSignupModel = async (payload) => {
    console.log("userSignupModel services ", payload);
    let  data = {
        firstName: payload ? payload.firstName : "",
        lastName: payload ? payload.lastName : "",
        email: payload ? payload.email : "",
        password: payload ? payload.password : "",  
        otp:otpServices()
    }
    return data;
  };


  const userSignupServices = async(res,email)=>{
    console.log('userSignupServices api req',email);
  
    try {
      let userDetails = await User.findOne({email:email})
          if(userDetails){

             let tokendata = {userId:userDetails._id,email:userDetails.email,verified:userDetails.verified}
             let token = await generateAccessToken(tokendata);
             userDetails.token = token
             userDetails.password = ''
             return userDetails
          } else {
            return false
          }
    } catch (error) {
      console.log('userSignupServices Services api error');
      return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
    }
  }
  


module.exports={
  userSignupModel,
    validateUser,
    userSignupServices,
    otpServices
}
