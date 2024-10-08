import Joi from "joi"
import { doctorRepository } from "../../database/repository";


export const get_doctor_profile_service = async ({ user_id }: { user_id: number }) => {

    const schema = Joi.object({
        user_id: Joi.number().required(),
    })

    const { error, value } = schema.validate({ user_id });

    if (error) throw new Error(error.details[0].message);

    const user = await doctorRepository.get_doctor_profile({ user_id })
    return { user }
}

export const create_doctor_address_service = async ({ address, zip_code, city, country, longitude, latitude, user_id }: { latitude: number, longitude: number, address: string, zip_code: string, city: string, country: string, user_id: number }) => {

    const schema = Joi.object({
        address: Joi.string().required(),
        zip_code: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required()
    })

    const { error, value } = schema.validate({ address, zip_code, city, country, longitude, latitude });

    if (error) throw new Error(error.details[0].message);

    const user = await doctorRepository.create_doctor_address({ address, zip_code, city, country, longitude, latitude, user_id })

    return { user }
}

export const update_doctor_address_service = async ({ id, address, zip_code, city, country, longitude, latitude, user_id }: { id: number, latitude: number, longitude: number, address: string, zip_code: string, city: string, country: string, user_id: number }) => {

    const schema = Joi.object({
        address: Joi.string().required(),
        zip_code: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required()
    })

    const { error, value } = schema.validate({ address, zip_code, city, country, longitude, latitude });

    if (error) throw new Error(error.details[0].message);

    const user = await doctorRepository.update_doctor_address({ id, address, zip_code, city, country, longitude, latitude, user_id })

    return { user }
}


export const delete_doctor_address_service = async ({ id, user_id }: { id: number, user_id: number }) => {

    const user = await doctorRepository.delete_doctor_address({ id, user_id })

    return { user }
}