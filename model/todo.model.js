const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
    title:String,
    body:String,
    userID:String,
    userName:String
},{
    versionKey:false
})
const TodoModel=mongoose.model("todo",todoSchema)
module.exports={TodoModel}