import { NextFunction, Request, Response } from 'express'
import jwtService from "../infrastructure/jwt.service.js";
import UserService from "../services/user.service.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }


    const token = req.headers.authorization.split(' ')[1]
    let userId: string | null = null

    try {
        userId = await jwtService.getUserIdByToken(token as string)

        if (userId) {
            req.user = await UserService.getUserById(userId)

            return next()
        }

    } catch (error: any) {
        res.status(401).send({message: error.message})
        return
    }


    res.sendStatus(401)
}