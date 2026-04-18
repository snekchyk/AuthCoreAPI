import { Request, Response} from 'express'
import AuthService from '../services/auth.service.js'
import {RequestWithBody} from "../types.js";
import {RegistrationInputModel} from "../models/input/RegistrationInputModel.js";
import {UserViewModel} from "../models/view/UserViewModel.js";
import {UserViewErrorModel} from "../models/view/UserViewErrorModel.js";
import {LoginInputModel} from "../models/input/LoginInputModel.js";
import {UserViewAccessStringModel} from "../models/view/UserViewAccessStringModel.js";

class AuthController {
    async register(req: RequestWithBody<RegistrationInputModel>, res: Response<UserViewModel | UserViewErrorModel>) {
        try {
            const newUser = await AuthService.register(req.body)

            res.status(201).json(newUser)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async login(req: RequestWithBody<LoginInputModel>, res: Response<UserViewAccessStringModel | UserViewErrorModel>) {
        try {
            const result = await AuthService.login(req.body)

            res.status(200).json(result)
        } catch (error: any) {
            res.status(401).json({ message: error.message })
        }
    }
}

export default new AuthController()