
const constant = require("./constant");
const { generateAccessToken } = require("../../middleware/authorizations");
const User = require("../model/User");

const createTaskServices = async(payload,userId) => {
      let  data = {
            name: payload ? payload.name : "",
            userId: userId  ,
            status: payload ? payload.status : "",
        }
        return data;
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
          
             let tokendata = {userId:userDetails._id,email:userDetails.email,verified:userDetails.verified}
             let token = await generateAccessToken(tokendata);
             userDetails.token = token
             userDetails.password = ''
             return userDetails
    } catch (error) {
      console.log('userSignupServices Services api error');
      return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
    }
  }
  
  const validateSignUpRequest = (data) => {
    let error = {}

    let rexemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     if(rexemail.test(data.email) == false){
      error.email = 'email invalid'
     }
     if(data.firstName == ''){
      error.firstName = 'firstName is  invalid'
     }
     if(data.lastName == ''){
      error.lastName = 'lastName is  invalid'
     }
     if(data.password == ''){
      error.password = 'password is  invalid'
     }

   return error
  }

module.exports={
  userSignupModel,
  createTaskServices,
    userSignupServices,
    otpServices,
    validateSignUpRequest
}
