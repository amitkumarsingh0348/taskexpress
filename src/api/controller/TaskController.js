
const User = require("../model/User");
const constant = require("../services/constant");
const taskManagement = require("../model/Task");
const { createTaskServices } = require("../services/taskServices");


const createTask = async (req, res) => {

  console.log(" createTask controller ",req.body);
  const { userId } = req.user;

  try {

    if(Object.keys(req.body).length === 0){    
      return res.status(204).json({status:constant.status.error, message:" Empty request ", data:{}})
    }

      // -----------------------------   CREATE TASK API ---------------------------- 
        let validateUser = await User.findOne({ _id: userId });
        if (!validateUser) {
          return res.status(403).json({status:constant.status.error, message: constant.message.nodatafound, data:{}})

        } else {
        let data = await createTaskServices(req.body,userId)
        let creatTask =  await taskManagement.create(data);
        if(creatTask){  
          return res.json({status:constant.status.success, message:" task created sucessfuly  ", data:creatTask})
        }else{
          return res.status(403).json({status:constant.status.error, message: constant.message.notinserted, data:{}})
        }
        }    
  } catch (error) {
    console.log("createTask register register error ...",error);
    return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
  }
};

const editTask = async (req, res) => {

      console.log(" editTask controller ",req.body);
     
      try {
    
        if(Object.keys(req.query.Id).length === 0){    
          return res.status(204).json({status:constant.status.error, message:" Empty request ", data:{}})
        }
    
          // -----------------------------   UPDATE TASK API ---------------------------- 
            let validateTask = await taskManagement.findOne({ _id: req.query.Id });
            if (!validateTask) {
              return res.status(403).json({status:constant.status.error, message: constant.message.nodatafound, data:{}})
    
            } else {
            let update =   await taskManagement.updateOne({_id:validateTask._id},{$set:req.body},{ new: true })
            if(update.acknowledged){  
              return res.json({status:constant.status.success, message:" task updated sucessfuly  ", data:update})
            }else{
              return res.status(403).json({status:constant.status.error, message: constant.message.notinserted, data:{}})
            }
            }    
      } catch (error) {
        console.log("editTask error ...",error);
        return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
      }
    };

    const taskList = async (req, res) => {
      console.log(" taskList controller .... ");

      try {
           let perPage = 5
           page = req.query?.page - 1
           let taskList =  await taskManagement.find().limit(perPage).skip(perPage * page).sort({createdAt: 'asc'})
           return res.json({status:constant.status.success, message:constant.message.getdatasucess, data:taskList})
      } catch (error) {
        console.log(" taskList error ...");
        return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
    
      }
    };

    
    const deleteTaskById = async (req, res) => {
      console.log(" deleteTaskById controller .... ");
      try {
            if(Object.keys(req.query.Id).length === 0  ){
                  return res.status(400).json({status:constant.status.error, message:constant.message.emptyreq, data:{}})
                } else{ 
                 await taskManagement.deleteOne({_id:req.query.Id })
                 return res.json({status:constant.status.success, message:constant.message.dataDelete, data:{}})
}
      } catch (error) {
        console.log(" deleteTaskById error ...");
        return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
    
      }
    };


    const sortTaskList = async (req, res) => {
      console.log(" taskList controller .... ");

      try {
           let perPage = 5
           page = req.query?.page || 1
           let taskList =  await taskManagement.find().limit(perPage).skip(perPage * page).sort({_id: 'asc'})
           return res.json({status:constant.status.success, message:constant.message.getdatasucess, data:taskList})
      } catch (error) {
        console.log(" taskList error ...");
        return res.json({status:constant.status.error, message:constant.message.errorSomethingWorng, data:{}})
    
      }
    };





module.exports = {
  createTask,
  editTask,
  taskList,
  deleteTaskById,
  sortTaskList
};
