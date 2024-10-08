import { PrismaClient, Role, Address } from '@prisma/client'

const prisma = new PrismaClient()

export const get_doctor_profile = async ({ user_id }: { user_id: number }) => {
    try {

        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                address: true
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}
export const create_doctor_address = async ({ address, zip_code, city, country, longitude, latitude, user_id }: { latitude: number, longitude: number, address: string, zip_code: string, city: string, country: string, user_id: number }) => {
    try {

        const user = await prisma.address.create({
            data: {
                address, zip_code, city, country, longitude, latitude, user_id
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}
