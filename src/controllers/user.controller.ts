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

    async update(req: RequestWithUser, res: Response) {
        const { name, age } = req.body
        console.log(req.user)
        const id = req.user.id
        console.log(id)

        const updatedUser = await UserService.updateUser(id, {name, age})
        return res.status(201).json(updatedUser)
    }

    async delete(req: Request, res: Response) {
        return
    }
}

export default new UserController()
