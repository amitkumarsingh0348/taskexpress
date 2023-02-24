
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
  createTaskServices,
    validateSignUpRequest
}
