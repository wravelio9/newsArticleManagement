import prisma from "../config/database.js";
import bcrypt from "bcrypt"

class UserRepository {
    static async register (data) {
        const hash = await bcrypt.hash(data.password, 13)
        return prisma.user.create({data: { 
            name: data.name,
            email: data.email,
            password: hash, 
            role: "reader",
            dateOfBirth: data.dateOfBirth
        }})
    }

    static async login (data) {
        return prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }
}

export default UserRepository