import { Request, Response } from 'express'
import UserService from "../services/user.service.js";
import {RequestWithUser} from "../types.js";
import {UserViewModel} from "../models/view/UserViewModel.js";

export class UserController {
    async information(req: RequestWithUser, res: Response<UserViewModel>) {
        const information = await UserService.getInformation(req.user.email)
        if (!information) {
            res.sendStatus(404)
            return
        }

        res.status(200).json(information)
    }

    async update(req: Request, res: Response) {
        return
    }

    async delete(req: Request, res: Response) {
        return
    }
}

export default new UserController()
