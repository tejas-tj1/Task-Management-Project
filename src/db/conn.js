const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/taskManagement').then(()=>{
    console.log("Database is connected successfully");    
}).catch((e)=>{
    console.log(e);
})