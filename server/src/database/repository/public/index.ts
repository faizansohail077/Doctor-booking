import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const create_user = async (first_name: string, last_name: string, email: string, password: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password
            }
        })
        return user
    } catch (error:any) { 
        throw new Error(error.code)
    }
}