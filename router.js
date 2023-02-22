
module.exports = (router) => {
  require("./src/api-routes/auth-routes")(router);
  require("./src/api-routes/task-routes")(router);
};
