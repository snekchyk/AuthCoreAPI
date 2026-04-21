import jwt, {JwtPayload} from "jsonwebtoken"
import {Users} from "@prisma/client";
import dotenv from "dotenv"

dotenv.config()

const key = process.env.JWT_ACCESS_SECRET || "fallback"
class JwtService {
    async generate(user: Users) {
        const token = jwt.sign({userId: user.id}, key, {expiresIn: "1d"})
        return token
    }

    async getUserIdByToken(token: string) {
        try {
            const result = jwt.verify(token, key) as JwtPayload & { userId: string };
            return result.userId
        } catch (error) {
            throw new Error("Unable to verify JWT token")
        }
    }
}

export default new JwtService()