import { Request, Response } from 'express';
import { publicService } from '../../../services';
import { ERROR_MESSAGE } from '../../../utils/variable';

export const create_user = async (req: Request, res: Response) => {
    try {
        const user = await publicService.create_user(req.body)
        res.status(200).send({ message: "User Created", ...user })
    } catch (error: Error | any) {
        console.log(error, 'create user')
        if (error.message === "P2002") {
            res.status(500).send({ message: `Email ${ERROR_MESSAGE.ALREADY_EXISTS}` })
        }
        else if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}

export const login_user = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await publicService.login_user(email, password)
        res.status(200).send({ message: "Welcome back!", ...user })
    } catch (error: Error | any) {
        console.log(error, 'login user controller')
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}

export const create_doctor = async (req: Request, res: Response) => {
    try {
        const user = await publicService.create_doctor(req.body)
        res.status(200).send({ message: "Doctor Created", ...user })
    } catch (error: Error | any) {
        console.log(error, 'create user')
        if (error.message === "P2002") {
            res.status(500).send({ message: `Email ${ERROR_MESSAGE.ALREADY_EXISTS}` })
        }
        else if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}