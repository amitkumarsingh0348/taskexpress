const { createTask, editTask, taskList, deleteTaskById, sortTaskList } = require("../api/controller/TaskController");
const { verify } = require("../middleware/authorizations");

module.exports = (app) => {
   
      app.post("/user/createtask",verify, (req, res) => createTask(req, res));
      app.patch("/user/edit-task?:Id",verify, (req, res) => editTask(req, res));
      app.get("/user/get-all-task?:page",verify, (req, res) => taskList(req, res)); 
      app.get("/user/sort-task?:page",verify, (req, res) => sortTaskList(req, res)); 
      app.get("/user/delete-task?:Id",verify, (req, res) => deleteTaskById(req, res));
 

  
};
