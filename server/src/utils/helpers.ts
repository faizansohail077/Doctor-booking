import { User } from "@prisma/client";
import { ENV } from "./variable";
import jwt from 'jsonwebtoken'

import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: ENV.CLOUD_NAME,
    api_key: ENV.API_KEY,
    api_secret: ENV.API_SECRET
});

export const generate_token = (user: User) => {
    const token = jwt.sign({
        id: user.id, email: user.email, role: user.role
    }, ENV.JWT_SECRET!, { expiresIn: "1h" });
    return token
}

export const upload_to_cloudinary = async (file: any) => {
    try {

        const result = await cloudinary.v2.uploader.upload(file.path, { folder: ENV.CLOUDINARY_FOLDER })
        return result.secure_url

    } catch (error) {
        console.log(error, 'Error Uploading Image')
        throw new Error("Error Uploading Image")
    }
}

export const delete_from_cloudinary = async (file: string) => {
    try {
        const lastPart = file.split('/').pop()
        const result = await cloudinary.v2.uploader.destroy(`${ENV.CLOUDINARY_FOLDER}/${lastPart?.split(".")[0]}`)
        return result

    } catch (error) {
        console.log(error, 'Error Deleting Image')
        throw new Error("Error Deleting Image")
    }
}