import { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken";
import jwtService from "../infrastructure/jwt.service.js";
import UserService from "../services/user.service.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token as string)

    if (userId) {
        req.user = await UserService.getUserById(userId)

        next()
        return
    }

    res.sendStatus(401)
}