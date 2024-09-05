import { User } from "@prisma/client";
import { ENV } from "./varialble";
import jwt from 'jsonwebtoken'

export const generate_token = (user: User) => {
    const token = jwt.sign({
        data: { id: user.id, email: user.email, role: user.role }
    }, ENV.SECRET, { expiresIn: "1h" });
    return token
}