import prisma from '../db.js'

class UserQueryRepository {
    async findByEmail(email: string) {
        const user = await prisma.users.findUnique({
            where: { email },
            select: {
                name: true,
                email: true,
                age: true,
            }
        })
        return user
    }
}

export default new UserQueryRepository()