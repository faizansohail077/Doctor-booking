import { Request, Response } from 'express';
import { publicService } from '../../../services';

export const create_user = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        await publicService.create_user(first_name, last_name, email, password)
        res.status(200).send({ message: "User Created" })
    } catch (error: Error | any) {
        console.log(error, 'create user')
        if (error.message) {
            res.status(500).send({ message: error.message })
        } else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}