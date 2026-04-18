import prisma from '../db.js' // Імпортуємо наш створений клієнт

class UserRepository {
    async save(user: any) {
        return prisma.users.create({
            data: user
        })
    }


    async isEmailAvailable(email: string) {
        const isAvailable = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        return !!isAvailable
    }


    async isNameAvailable(name: string) {
        const isAvailable = await prisma.users.findUnique({
            where: {
                name: name
            }
        })
        return !!isAvailable
    }


    async findUserByName(name:  string) {
        return prisma.users.findUnique({
            where: {
                name: name
            }
        })
    }
}

export default new UserRepository()