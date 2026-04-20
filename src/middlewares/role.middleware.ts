import { Response, NextFunction } from 'express'
import { RequestWithUser } from "../types.js"

export const roleMiddleware = (requiredRole: string)=> {

    console.log(requiredRole)

    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        if (req.user.role != requiredRole) {
            return res.status(403).json({ message: "Forbidden: Access Denied" })
        }

        next()
    }
}