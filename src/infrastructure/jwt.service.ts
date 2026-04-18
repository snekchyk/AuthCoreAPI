import jwt from "jsonwebtoken"
import {Users} from "@prisma/client";

const key = "123"

class JwtService {
    async generate(user: Users) {
        const token = jwt.sign({userId: user.id}, key, {expiresIn: "1d"})
        console.log(token)
        return token
    }
}

export default new JwtService()