import { publicRepository } from "../../database/repository";

import Joi from "joi"
import bcrypt from 'bcrypt'
import { ERROR_MESSAGE } from "../../utils/variable";
import { generate_token } from "../../utils/helpers";
import { Role } from "@prisma/client";

const saltRounds = 10;

export const create_user = async ({ first_name, last_name, email, password, role }: { first_name: string, last_name: string, email: string, password: string, role?: Role }) => {

    const schema = Joi.object({
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email().required()
    })

    const { error, value } = schema.validate({ first_name, last_name, email, password });

    if (error) throw new Error(error.details[0].message);

    const hash = await bcrypt.hash(password, saltRounds)
    const user = await publicRepository.create_user(value.first_name, value.last_name, value.email, hash, role)

    const token = generate_token(user);

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token }
}

export const login_user = async (email: string, password: string) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    const { error, value } = schema.validate({ email, password });

    if (error) throw new Error(error.details[0].message);

    const user = await publicRepository.login_user(value.email)
    if (!user) throw new Error(ERROR_MESSAGE.INVALID_CREDENTIALS);

    const hash = await bcrypt.compare(password, user.password)
    if (!hash) throw new Error(ERROR_MESSAGE.INVALID_CREDENTIALS);

    const token = generate_token(user);

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token }
}