const passport = require("passport");
const {  userRegister, validateOtp,} = require("../api/controller/UserApiController");
const { userSignupServices } = require("../api/services/authServices");
const { verify, generateAccessToken, userOtpValidate } = require("../middleware/authorizations");

module.exports = (app) => {
   
  app.post("/user/signup", (req, res) => userRegister(req, res));
  app.post("/user/validate-otp",userOtpValidate, (req, res) => validateOtp(req, res));
 
   // ----------------------------------User Web login---------------------------------------------------------------?
   app.post("/user/signin", async(req, res, next) => {
    passport.authenticate("webLogin",  async(err, user, info)=> {
      console.log("user signin controller response Data => ", user);
      if (err || !user) {
        return res.status(400).json({status:"error", message:"Invalid credentials ", data:{}})
      } else {
        req.logIn(user, async(err) => {
          if (err) {
            return res.status(400).json({status:"error", message:"Invalid credentials ", data:{}})
          } else {

           if(req.user.verified == false){
            return res.status(403).json({status:"error", message:"Email Otp not Verified ", data:{}})
           }
            if (
              req.user.role != "" ||
              req.user.role != undefined ||
              req.user.role != null
            ) {
              const { email, userId, firstName, lastName, role, id } = req.user;
              req.session.email = email;
              req.session.firstName = firstName ? firstName : "";
              req.session.userId = userId ? userId : id;
              req.session.lastName = lastName ? lastName : "";
              req.session.role = role;
            
              let ownnerDetail = await userSignupServices(res,email)
              ownnerDetail.otp = ''
              return res.status(200).json({status:"success", message:"user details ", data:ownnerDetail})
            }
            return res.json({status:"error", message:"Invalid credentials ", data:{}})
          }
        });
      }
    })(req, res);
  });
  
};
