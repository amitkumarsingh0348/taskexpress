module.exports = {
  PORT: 4000,
  SALT_WORK_FACTOR: 10,
  senderMailId:"", 
  mailKey:"",
  userJwtSecret:
    "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
  method: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
  },
  status: {
    success: "success",
    error: "error",
    active: "Active",
    inActive: "InActive",
  },
  message: {
    expireToken: "token expired ",
    errorSomethingWorng: "Something went worng !",
    dataAlreadyExist: "dataAlreadyExist!",
    dateisbooked: "date is booked  !",
    emptyreq: "Empty request Or Valid Bearer Token Is Missing",
    inserted: "User details inserted succesfully  ",
    insertedDetails: " details inserted succesfully  ",
    notinserted: "User details not inserted succesfully  ",
    getdatasucess: "Data fetch successfully",
    nodatafound: "no data found",
    notAccesRight: "you have no Acess Right",
    signupexisterror: "Signup Failed. User already registered",
    googleemptytoken: "token is undefined ",
    jwtAuthFailed: "Authentication invalid",
    dataNotFound: "data not found",
    updateSucess:'data update sucessfully',
    notUpdateSucess:'data not update sucessfully',
    dataDelete:'data deleted sucessfully !'

  },

  roles: {
    admin: "admin",
    user: "user",

  },
  
};
