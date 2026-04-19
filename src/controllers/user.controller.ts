import { Request, Response } from 'express'
import UserService from "../services/user.service.js";

export class UserController {
    async information(req: Request, res: Response) {
        const information = await UserService.getInformation(req.user.email)

        res.json(information)
    }

    async update(req: Request, res: Response) {
        return
    }

    async delete(req: Request, res: Response) {
        return
    }
}

export default new UserController()
