import express from "express"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv/config"
import { ref } from "node:process"
import UserContollers from "../controller/user.controller.js"
import authenticateToken from "../middleware/authMiddleware/authenticate.js"
import generateAccessToken from "../middleware/authMiddleware/generateToken.js"

const userRouter = express.Router()

userRouter.post("/token", UserContollers.getToken)
userRouter.post("/register", UserContollers.register)
userRouter.post("/login", UserContollers.login)
userRouter.delete("/logout", UserContollers.logout)

export default userRouter

// app.listen(4000)

////////////////////////////////////////////////////////////////////

//import bcrypt from "bcrypt";
// import express from "express"

// const users = [
//     {

//     }
// ];

// // const salt = bcrypt.genSaltSync(10)

// app.post("/login", async (req, res) => {
//     const { username, password} = req.body
//     const user = users.find(u => u.username === username)
    

//     if(!user) {
//         res.send("Invalid user")
//         return
//     }

//     const hash = await bcrypt.compare(password, user.password)

//     if(!hash) {
//         res.send("Invalid Password!")
//         return
//     }

//     res.send("Login successfully")
// })

// app.listen(8000, () => console.log("http://localhost:8000/"))
