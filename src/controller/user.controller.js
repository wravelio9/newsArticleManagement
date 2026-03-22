import prisma from "../config/database.js";
import UserService from "../service/user.service.js";
import newsService from "../service/user.service.js";
import { createUserSchema } from "../validator/user.validator.js";
import jwt from "jsonwebtoken"
import generateToken from "../middleware/authMiddleware/generateToken.js"

let refreshTokens = []

class UserContollers {
    // Controller for Get Token
    static async getToken (req, res, next) {
        try {
            const refreshToken = req.body.token;

            if (refreshToken == null) return res.sendStatus(401)
            if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
                if(err) return res.sendStatus(403)
                const accessToken = generateAccessToken({ name: user.name })
                res.json({ accessToken: accessToken })
                })  

        } catch(err) {
            next(err)
        }       
    }

    // Controller for Register
    static async register (req, res, next) {
        try {
            const { error, value } = createUserSchema.validate(req.body)

            if (error) return res.status(400).json({ message: error.details[0].message})

            const user = await UserService.register(value)
            res.status(201).json({ message: "Register Successful"})
            
        } catch (err) {
            next(err)
        }
    }

    // Controller for Logout
    static async logout (req, res, next) {
        try {
            refreshTokens = refreshTokens.filter(token => token !== req.body.token)
            res.sendStatus(204)
        } catch(err) {
            next(err)
        }
    }

    // Controller for Login
    static async login (req, res, next) {
        try {
            const { error, value } = req.body
            if (error) return res.status(404).json({ message: error.details[0].message })
            const user = UserService.login(value)
            res.status(200).json({ data: user })
        } catch (err) {
            next(err)
        }


        const isPasswordValid = await bcrypt.compare(password, user.password)
        const expiresIn = 60 * 60 * 1

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

        // const accessToken = generateAccessToken(user)
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
        // refreshTokens.push(refreshToken)
        // res.json({ accessToken: accessToken, refreshToken: refreshToken })
    }
}


export default UserContollers