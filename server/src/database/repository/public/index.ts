import { PrismaClient,Role } from '@prisma/client'

const prisma = new PrismaClient()

export const create_user = async (first_name: string, last_name: string, email: string, password: string, role?: Role) => {
    try {
        const user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password,
                role: role || 'PATIENT'
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}

export const login_user = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code)
    }
}