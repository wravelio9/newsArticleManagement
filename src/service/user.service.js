import UserRepository from "../repository/user.repository.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

class UserService {
    // Service for Register
    static async register (data) {
        const user = await UserRepository.register(data)
        return user
    }

    // Service for Logout
    static async logout (data) {

    }

    // Service for Login
    static async login (data) {
        const user = await UserRepository.login(data)

        if(!data) {
            throw new Error("No data")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        const expiresIn = 60 * 60 * 1

        if (isPasswordValid) {
            const payload = {
                id: user.id,
                name: user.name,
            }
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: expiresIn})
            return { payload, token }
        } else {
            throw new Error("Wrong Password")
        }

        //Ini dimana ya
        // const accessToken = generateAccessToken(user)
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
        // refreshTokens.push(refreshToken)
        // res.json({ accessToken: accessToken, refreshToken: refreshToken })

        return user
    }
}

export default UserService