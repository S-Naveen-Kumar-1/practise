const mongoose=require("mongoose");

const tokenSchema=mongoose.Schema({
   token:String
},{
    versionKey:false
})
const tokenModel=mongoose.model("token",tokenSchema);
module.exports={tokenModel}