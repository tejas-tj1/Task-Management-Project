const mongoose = require("mongoose");
//Hall Booking Schema
const taskModel = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  completed:{type:Boolean,default:false}
});

const taskSchema= mongoose.model("taskSchema", taskModel);

module.exports = taskSchema;
