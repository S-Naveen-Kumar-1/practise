const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { todoRouter } = require("./routes/todo.routes");
const app = express()
const cors=require("cors")
app.use(express.json());
app.use(cors())
app.use("/users",userRouter)
app.use("/todos",todoRouter)

const port = process.env.port

app.listen(port, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log("server running in port 8080")
    }
    catch (err) {
        console.log(err)
    }
})

