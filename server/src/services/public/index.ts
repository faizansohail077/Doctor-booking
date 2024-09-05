import { publicRepository } from "../../database/repository";

import Joi from "joi"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ENV } from "../../utils/varialble";

const saltRounds = 10;

export const create_user = async (first_name: string, last_name: string, email: string, password: string) => {
    
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email().required()
    })

    const { error, value } = schema.validate({ first_name, last_name, email, password });
    
    if (error) throw new Error(error.details[0].message);

    const hash = await bcrypt.hash(password, saltRounds)
    const user = await publicRepository.create_user(value.first_name, value.last_name, value.email, hash)

    const token = jwt.sign({
        data: { id: user.id, email: user.email, role: user.role }
    }, ENV.SECRET, { expiresIn: "1h" });

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token }
}