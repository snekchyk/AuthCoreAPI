import prisma from '../db.js'
import {UserViewModel} from "../models/view/UserViewModel.js";
import {UserViewErrorModel} from "../models/view/UserViewErrorModel.js";

class UserQueryRepository {
    async findByEmail(email: string): Promise<UserViewModel | null> {
            return prisma.users.findUnique({
                where: { email },
                select: {
                    name: true,
                    email: true,
                    age: true,
                }
        })
    }
}

export default new UserQueryRepository()