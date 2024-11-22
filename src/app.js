const express = require("express");
const mongoose = require("mongoose");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port=process.env.port || 3000;

require("./db/conn");
const taskSchema = require("./model/taskModel");
const staticPath = path.join(__dirname, "../public");


app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage Route
app.get("", (req, res) => {
  res.render("homepage");
});
app.post("/addTask", async (req, res) => {
  try {
    const task = taskSchema({
      title: req.body.taskTitle,
      description: req.body.taskDescription,
    });
    await task.save();
    res.render("tasks", { task });
  } catch (error) {
    console.log("Error Occured",error);
    res.status(500).send("Something is Wrong!");
  }
});

//Display List of Tasks
app.get("/viewTasks", async (req, res) => {
  try{const taskData = await taskSchema.find();
  res.render("viewTask", { taskData });
  // console.log(taskData);
  }
  catch(error){
    console.log("Error Occured",error);
    res.status(500).send('Something is Wrong!');
      }
});

//Mark as completed the tasks
app.post("/tasks/mark-completed/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await taskSchema.findByIdAndUpdate(taskId, { completed: true }); // Update the task
    res.redirect("/"); // Redirect to the home page
  } catch (error) {
    console.error("Error Occured", error);
    res.status(500).send("Something is Wrong!");
  }
});

//Route to page of edit the tasks
app.get("/tasks/edit/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await taskSchema.findById(taskId); // Fetch task by ID
    res.render("editTask", { task }); // Pass task data to edit form
  } catch (error) {
    console.error("Error occured ", error);
    res.status(500).send("Something is Wrong!");
  }
});

//Edit the tasks
app.post("/tasks/update/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
    };
    await taskSchema.findByIdAndUpdate(taskId, updatedData); // Update task data
    res.redirect("/"); // Redirect back to the task list page
  } catch (error) {
    console.error("Error Occured", error);
    res.status(500).send("Something is Wrong!");
  }
});

//Delete the tasks
app.post("/tasks/delete/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await taskSchema.findByIdAndDelete(taskId); // Delete the task from MongoDB
    res.redirect("/"); // Redirect to the task list page
  } catch (error) {
    console.error("Error Occured", error);
    res.status(500).send("Something is Wrong");
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
