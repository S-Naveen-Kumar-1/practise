const express = require("express")
const { UserModel } = require("../model/user.model")

const userRouter = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { tokenModel } = require("../model/token.model");
const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$#*&?])[a-zA-Z\d@!$#*&?]{8,}$/
userRouter.post("/add", (req, res) => {
    const { email, name, password } = req.body
    if (!password.match(check)) {
        res.status(400).send({ "error": "Password does not meet the requirements." });
        return;
    }
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(200).send({ "msg": "couldnot hash the password" })
            }
            else {
                const user = new UserModel({
                    name,
                    email,
                    password: hash
                })
                await user.save()
                res.status(200).send({ "msg": "registered successfully", "user": req.body })
            }
        });

    }
    catch (err) {
        res.status(400).send({ "error": err.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password,name } = req.body

    try {
        const user = await UserModel.findOne({ email })
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ name:user.name,userid:user._id  }, "masai", { expiresIn: 300 })
                res.status(200).send({ "msg": "logged in successfully", "token": token })
            }
            else {
                res.status(200).send({ "msg": "wrong credentials" })
            }
        });
    }
    catch (err) {
        res.status(400).send({ "error": err.message })
    }

})

userRouter.get("/logout",async(req,res)=>{
const token=req.headers.authorization?.split(" ")[1]
try{
    await tokenModel.create({token})
    res.status(200).send({"msg":"logged out successfully"})
} 
catch(err){
    res.status(400).send({ "error": err.message })
}
})
module.exports = { userRouter }