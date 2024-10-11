import { PrismaClient, Role, Address } from '@prisma/client'
import { delete_from_cloudinary } from '../../../utils/helpers'

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

// doctor address
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

export const update_doctor_address = async ({ id, address, zip_code, city, country, longitude, latitude, user_id }: { latitude: number, longitude: number, address: string, zip_code: string, city: string, country: string, user_id: number, id: number }) => {
    try {
        const address_exist = await prisma.address.findFirst({
            where: {
                id
            }
        })

        if (!address_exist) throw new Error('Address not found')
        if (address_exist?.user_id !== user_id) throw new Error('Invalid Credentials')

        const user = await prisma.address.update({
            where: {
                id,
                user_id
            },
            data: {
                address, zip_code, city, country, longitude, latitude, user_id
            },
            include: {
                user: true
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}

export const delete_doctor_address = async ({ id, user_id }: { user_id: number, id: number }) => {
    try {
        const address_exist = await prisma.address.findFirst({
            where: {
                id
            }
        })

        if (!address_exist) throw new Error('Address not found')
        if (address_exist?.user_id !== user_id) throw new Error('Invalid Credentials')

        const user = await prisma.address.delete({
            where: {
                id,
                user_id
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}

// doctor profile

export const create_doctor_profile = async ({ specialty, image, user_id }: { image: string, specialty: string, user_id: number }) => {
    try {

        const user = await prisma.profile.create({
            data: {
                specialty, image, user_id
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}

export const update_doctor_profile = async ({ id, specialty, image, user_id }: { image: string, specialty: string, user_id: number, id: number }) => {
    try {
        const profile_exist = await prisma.profile.findFirst({
            where: {
                id
            }
        })

        if (!profile_exist) throw new Error('Profile not found')
        if (profile_exist?.user_id !== user_id) throw new Error('Invalid Credentials')

        if(image){
            await delete_from_cloudinary(profile_exist.image)
        }

        const user = await prisma.profile.update({
            where: {
                id,
                user_id
            },
            data: {
                specialty, image, user_id
            },
            include: {
                user: true
            }
        })

        return user
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}
