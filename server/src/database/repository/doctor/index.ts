import { PrismaClient, WeekDay } from '@prisma/client'
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

        if (image) {
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

// doctor availability

export const get_doctor_availability = async ({ date, user_id }: { date: Date, user_id: number }) => {
    try {

        const user = await prisma.availability.findMany({
            where: {
                user_id
            }
        })
        if (!user) throw new Error('No availability found')

        const availability = await prisma.availability.findMany({
            where: {
                date: date,
                booked: false // Optional: Only show unbooked slots
            }
        });

        return availability
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}

export const create_doctor_availability = async ({ date, day, start, end, user_id }: { date: Date, day: WeekDay, start: string, end: string, user_id: number }) => {
    try {

        const user = await prisma.availability.create({
            data: {
                date, day, start, end, user_id
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code ? error.code : error.message)
    }
}

export const update_doctor_availability = async ({ id, date, day, start, end, user_id }: { date: Date, day: WeekDay, start: string, end: string, user_id: number, id: number }) => {
    try {
        const address_exist = await prisma.availability.findFirst({
            where: {
                id
            }
        })

        if (!address_exist) throw new Error('Availability not found')
        if (address_exist?.user_id !== user_id) throw new Error('Invalid Credentials')

        const user = await prisma.availability.update({
            where: {
                id,
                user_id
            },
            data: {
                date, day, start, end, user_id
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

export const delete_doctor_availability = async ({ id, user_id }: { user_id: number, id: number }) => {
    try {
        const address_exist = await prisma.address.findFirst({
            where: {
                id
            }
        })

        if (!address_exist) throw new Error('Availability not found')
        if (address_exist?.user_id !== user_id) throw new Error('Invalid Credentials')

        const user = await prisma.availability.delete({
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