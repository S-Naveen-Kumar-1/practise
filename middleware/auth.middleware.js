const { tokenModel } = require("../model/token.model")
const jwt = require('jsonwebtoken');
const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        const token1=await tokenModel.findOne({token})
        // console.log(token1)
        if(token1){
            res.status(200).send({'msg':"please login token present"})
        }
        jwt.verify(token,"masai",(err,decoded)=>{
            console.log(decoded)
            if(decoded){
                req.body.userName=decoded.name
                req.body.userID=decoded.userid

                next()
            }
            else{
                res.send("youre not authorized")
            }
        })
    }
    else{
        res.send("please login")
    }
}
module.exports={auth}