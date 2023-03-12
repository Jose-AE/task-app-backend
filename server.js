require('dotenv').config()
//modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//constants
const DB_URL = process.env.DB_ACCES_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL


//Schemas models 
const Task = require("./models/Task");

//create app
const app = express();
app.use(express.json());
app.use(cors({origin:FRONTEND_URL})); //allow client to acces api



mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, dbName:"TaskBD"})
.then(()=>{console.log("db connected")})
.catch((err)=>{console.log(err)});



app.get("/tasks/:userId", async (req, res) =>{
    try{
        const tasks = await Task.find({userId:req.params.userId}); //object
        res.send(tasks);
    }catch(err){
        console.log(err);
        res.status(500).send("Server error getting tasks");
    } 
});


app.post("/tasks/create", async (req, res) =>{

    try{
        const {userId, text, complete} = req.body;
        await Task.create({userId, text, complete, timestamp:Date.now()});
        res.send("Task created");
    }catch(error){
        console.log(err);
        res.send("Server error creating task");
    }
});


app.delete("/tasks/delete/:id", async (req, res) =>{
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.send("Task deleted");
    }catch(error){
        console.log(err);
        res.send("Server error deleting task");
    }
});

app.get("/tasks/complete/:id", async (req, res) =>{
    try{
        const task = await Task.findById(req.params.id); //object
        task.complete = !task.complete;
        await task.save()
        res.send(`Task ${task.text} has been set to ${task.complete? "complete":"pending"}`);
    }catch(err){
        console.log(err);
        res.status(500).send("Server error getting tasks");
    } 
});



app.listen(PORT, ()=>{
    console.log(`server running in port ${PORT}`)
});