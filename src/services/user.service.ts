import UserRepository from '../repositories/user.repository.js'
import UserQueryRepository from "../repositories/user.query.repository.js";
import {Users} from "@prisma/client";
import {UserViewModel} from "../models/view/UserViewModel.js";


class AuthService {
    async getUserById(id: string): Promise<Users> {
        const user = await UserRepository.findUserById(id)

        if (!user) {
            throw new Error("User not found")

        }

        return user
    }

    async getInformation(email: string): Promise<UserViewModel> {
        const user = await UserQueryRepository.findByEmail(email)
        if (!user) {
            throw new Error("User not found")
        }
        return user
    }

    async updateUser(id: string, data: { name: string, age: number }) {
        return await UserRepository.updateUserById(id, data)
    }

    async deleteUser(id: string) {
        return UserRepository.deleteUserById(id)
    }

}

export default new AuthService()