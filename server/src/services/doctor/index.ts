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
console.log(user_id,'user_id')
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