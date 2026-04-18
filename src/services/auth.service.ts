import bcrypt from 'bcrypt'
import UserRepository from '../repositories/user.repository.js'
import UserQueryRepository from "../repositories/user.query.repository.js";
import JwtService from "../infrastructure/jwt.service.js";

class AuthService {
    async register(name: any, password: any, email: any, age: any) {
        const isEmailAvailable = await UserRepository.isEmailAvailable(email)
        const isNameAvailable = await UserRepository.isNameAvailable(name)

        if (isEmailAvailable) {
            throw new Error('This email is already taken')
        }
        if (isNameAvailable) {
            throw new Error('This name is already taken')
        }


        const passwordSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, passwordSalt)

        const newUser = {
            name: name,
            password: hashedPassword,
            email: email,
            age: age,
        }

        await UserRepository.save(newUser)

        return UserQueryRepository.findByEmail(newUser.email)
    }

    async login(name: any, password: any) {
        const user = await UserRepository.findUserByName(name)
        if (!user) {
            throw new Error("Invalid username or password")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new Error("Invalid username or password")
        }

        const token = await JwtService.generate(user)
        console.log(token)

        const payload = await UserQueryRepository.findByEmail(user.email)

        return {
            accessToken: token,
            user: payload
        }
    }
}

export default new AuthService()