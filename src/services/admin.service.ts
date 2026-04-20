import UserRepository from "../repositories/user.repository.js";
import {Users} from "@prisma/client";
import {RequestWithParams} from "../types.js";

class AdminService {
    async getAllUsers(): Promise<Users[] | null> {
        return UserRepository.getAllUsers()
    }

    async getInfo(id: string): Promise<Users | null> {
        return UserRepository.findUserById(id)
    }

    async updateRole(id: string) {
        return UserRepository.updateRole(id)
    }

    async deleteUser(id: string): Promise<Users> {
        return UserRepository.deleteUserById(id)
    }
}

export default new AdminService()