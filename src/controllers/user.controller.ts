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

    async update(req: RequestWithUser, res: Response<UserViewModel>) {
        const { name, age } = req.body
        const id = req.user.id

        const updatedUser = await UserService.updateUser(id, {name, age})
        return res.status(201).json(updatedUser)
    }

    async delete(req: RequestWithUser, res: Response) {
        const id = req.user.id

        try {
            await UserService.deleteUser(id)
        } catch (error) {
            res.sendStatus(400)
        }

        res.sendStatus(204)

    }
}

export default new UserController()
