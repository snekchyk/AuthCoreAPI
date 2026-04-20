import bcrypt from 'bcrypt'
import UserRepository from '../repositories/user.repository.js'
import UserQueryRepository from "../repositories/user.query.repository.js";
import JwtService from "../infrastructure/jwt.service.js";
import {UserViewModel} from "../models/view/UserViewModel.js";
import {RegistrationInputModel} from "../models/input/RegistrationInputModel.js";
import {UserViewErrorModel} from "../models/view/UserViewErrorModel.js";
import {UserViewAccessStringModel} from "../models/view/UserViewAccessStringModel.js";
import {LoginInputModel} from "../models/input/LoginInputModel.js";

class AuthService {
    async register(data: RegistrationInputModel): Promise<UserViewModel> {
        if (!data.name || !data.email || !data.password || !data.age) {
            throw new Error('Missing required fields')
        }

        const isEmailAvailable = await UserRepository.isEmailAvailable(data.email)
        const isNameAvailable = await UserRepository.isNameAvailable(data.name)

        if (isEmailAvailable) {
            throw new Error('This email is already taken')
        }
        if (isNameAvailable) {
            throw new Error('This name is already taken')
        }


        const passwordSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, passwordSalt)

        const newUser = {
            name: data.name,
            password: hashedPassword,
            email: data.email,
            age: data.age,
        }

        await UserRepository.save(newUser)

        console.log(newUser)

        const user = await UserQueryRepository.findByEmail(newUser.email)

        if (!user) {
            throw new Error('User not found')
        }

        return user

    }

    async login(data: LoginInputModel): Promise<UserViewAccessStringModel> {
        const user = await UserRepository.findUserByName(data.name)
        if (!user) {
            throw new Error("Invalid username or password")
        }

        const isPasswordCorrect = await bcrypt.compare(data.password, user.password)
        if (!isPasswordCorrect) {
            throw new Error("Invalid username or password")
        }

        const token = await JwtService.generate(user)
        console.log(token)

        const payload = await UserQueryRepository.findByEmail(user.email)
        if (!payload) {
            throw new Error('Invalid username or password')
        }

        return {
            accessToken: token,
            user: payload
        }
    }
}

export default new AuthService()