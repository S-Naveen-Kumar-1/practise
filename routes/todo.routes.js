const express = require("express");
const { TodoModel } = require("../model/todo.model");
const { auth } = require("../middleware/auth.middleware");
const todoRouter=express.Router();
todoRouter.use(auth)
todoRouter.post("/create",async(req,res)=>{
    try{
        const todo=new TodoModel(req.body)
        await todo.save()
        res.status(200).send({"msg":"todo added","todo":req.body})
    }
    catch(err){
        res.status(400).send({"error":err.message})
    }
})
todoRouter.get("/",async(req,res)=>{
    try{
        const todo=await TodoModel.find({userName:req.body.userName})
res.send(todo)
    }catch(err){
        res.send(err.message)
    }
})
todoRouter.patch("/update/:id",async(req,res)=>{
const {id}=req.params;
const todo=await TodoModel.findOne({_id:id})
console.log(todo)
try{
    // console.log(todo.userId,req.body.userID)
    if(todo.userID==req.body.userID){
        await TodoModel.findByIdAndUpdate({_id:id},req.body)
        res.send(`todo with ${id} updated successfully`)
        }
        else{
            res.send("not authorised")
        }
}
catch(err){
    res.send(err)
}

})
todoRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    const todo=await TodoModel.findOne({_id:id})
    // console.log(todo)
    try{
        // console.log(todo.userId,req.body.userID)
        if(todo.userID==req.body.userID){
            await TodoModel.findByIdAndDelete({_id:id})
            res.send(`todo with ${id} deleted successfully`)
            }
            else{
                res.send("not authorised")
            }
    }
    catch(err){
        res.send(err)
    }
    
    })

module.exports={todoRouter}