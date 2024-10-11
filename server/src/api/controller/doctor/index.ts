import { Response } from 'express';
import { doctorService } from '../../../services';
import { ERROR_MESSAGE } from '../../../utils/variable';

export const get_doctor_profile = async (req: any, res: Response) => {
    try {
        const user_id = req.user.id
        const doctor = await doctorService.get_doctor_profile_service({ user_id })
        res.status(200).send({ message: "Doctor Profile", ...doctor })

    } catch (error: Error | any) {
        console.log(error, 'get_doctor_profile controller')
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }

}


// doctor address
export const create_doctor_address = async (req: any, res: Response) => {
    try {

        const request = { ...req.body, user_id: req.user.id }
        const doctor = await doctorService.create_doctor_address_service(request)
        res.status(200).send({ message: "Doctor Address", ...doctor })

    } catch (error: Error | any) {
        console.log(error, 'create_doctor_address controller')
        if (error.message === "P2002") {
            res.status(500).send({ message: `Address ${ERROR_MESSAGE.ALREADY_EXISTS}` })
        }
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}


export const update_doctor_address = async (req: any, res: Response) => {
    try {
        const request = { ...req.body, user_id: req.user.id, id: Number(req.params.id) }
        const doctor = await doctorService.update_doctor_address_service(request)
        res.status(200).send({ message: "Doctor Address", ...doctor })

    } catch (error: Error | any) {
        console.log(error, 'update_doctor_address controller')
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}

export const delete_doctor_address = async (req: any, res: Response) => {
    try {
        const request = { user_id: req.user.id, id: Number(req.params.id) }
        const doctor = await doctorService.delete_doctor_address_service(request)
        res.status(200).send({ message: "Doctor Deleted", ...doctor })

    } catch (error: Error | any) {
        console.log(error, 'delete_doctor_address controller')
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}

// doctor profile
export const create_doctor_profile = async (req: any, res: Response) => {
    try {
        const request = {
            specialty: req.body.specialty,
            image: req.file,
            user_id: req.user.id
        };
        const doctor = await doctorService.create_doctor_profile_service(request)
        // res.status(200).send({ message: "Doctor Profile", ...doctor })
        res.status(200).send({ message: "Doctor Profile" })

    } catch (error: Error | any) {
        console.log(error, 'create_doctor_address controller')
        if (error.message === "P2002") {
            res.status(500).send({ message: `Address ${ERROR_MESSAGE.ALREADY_EXISTS}` })
        }
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}


export const update_doctor_profile = async (req: any, res: Response) => {
    try {
        const request = { ...req.body, user_id: req.user.id, id: Number(req.params.id) }
        const doctor = await doctorService.update_doctor_profile_service(request)
        res.status(200).send({ message: "Doctor Address", ...doctor })

    } catch (error: Error | any) {
        console.log(error, 'update_doctor_address controller')
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}

export const delete_doctor_profile = async (req: any, res: Response) => {
    try {
        const request = { user_id: req.user.id, id: Number(req.params.id) }
        const doctor = await doctorService.delete_doctor_profile_service(request)
        res.status(200).send({ message: "Doctor Deleted", ...doctor })

    } catch (error: Error | any) {
        console.log(error, 'delete_doctor_address controller')
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}