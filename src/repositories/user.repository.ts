import prisma from '../db.js'
import { Prisma, Users } from "@prisma/client"; // Імпортуємо наш створений клієнт

class UserRepository {
    async save(user: Prisma.UsersCreateInput) {
        await prisma.users.create({
            data: user
        })
    }


    async isEmailAvailable(email: string): Promise<boolean> {
        const isAvailable = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        return !!isAvailable
    }


    async isNameAvailable(name: string): Promise<boolean> {
        const isAvailable = await prisma.users.findUnique({
            where: {
                name: name
            }
        })
        return !!isAvailable
    }


    async findUserByName(name:  string): Promise<Users | null> {
        return prisma.users.findUnique({
            where: {
                name: name
            }
        })
    }

    async findUserById(id:  string): Promise<Users | null> {
        return prisma.users.findFirst({
            where: {
                id: id
            }
        })
    }

    async updateUserById(id: string, data: { name: string, age: number }) {
        return prisma.users.update({
            where: { id },
            data: data,
            select: {
                name: true,
                age: true,
                email: true
            }
        })
    }

    async deleteUserById(id: string) {
        return prisma.users.delete({
            where: {
                id: id
            }
        })
    }
}

export default new UserRepository()