/**
 * Module dependencies.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const oAuthTypes = ["google", "facebook"];

/**
 * User Schema
 */

const task = new Schema(
  {
    name: { type: String,lowercase: true, default: "" },
    userId: { type:  Schema.Types.ObjectId, default: "" },
    status: { type: String, default: "Incomplete" },
  },
  { timestamps: true }
);



const taskManagement = mongoose.model("Task", task);

module.exports = taskManagement;
