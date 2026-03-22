import express from "express"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv/config"
import { ref } from "node:process"

const app = express()

app.use(express.json())

let refreshTokens = []

let posts = [
    {
        username: "Kyle",
        post: "hi kyle"
    },
    {
        username: "jim",
        post: "hi jim"
    }
]

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post("/token", (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })

    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    const expiresIn = 15

    if (isPasswordValid) {
        const payload = {
            id: user.id,
            name: user.name,
        }
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: expiresIn})
        return res.json({
            data: {
                id: user.id,
                name: user.name,
            },
            token: process.env.ACCESS_TOKEN
        })
    } else {
        return res.status(403).json({
            message: "Wrong password"
        })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

// app.get("/posts", (req, res) => {
    
// })

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.status(401).json({ message: "Token needed"})

    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    const secret = process.env.ACCESS_TOKEN

    try {
        const jwtDecode = jwt.verify(token, secret)
        if (typeof jwtDecode !== 'string') rseq.userData = jwtDecode
    } catch(err){
        return res.status(401).json({ message: "Unauthorized" })
    }
    next()
}

function generateAccessToken (user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '15s' })
}

app.listen(4000)

////////////////////////////////////////////////////////////////////

//import bcrypt from "bcrypt";
// import express from "express"

// const users = [
//     {

//     }
// ];

// // const salt = bcrypt.genSaltSync(10)
// app.post("/register", async (req, res) => {
//     const { username, password} = req.body  
//     const hash = await bcrypt.hash(password, 13)

//     users.push({
//         username,
//         password: hash
//     })
//     console.log(users)
//     res.send("ok")

// });

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