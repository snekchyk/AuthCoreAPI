import { Request, Response } from 'express'
import AdminService from "../services/admin.service.js";
import {Users} from "@prisma/client";
import {RequestWithParams} from "../types.js";

class AdminController {
    async allUsers(req: Request, res: Response) {
        const allUsers: Users[] | null = await AdminService.getAllUsers()

        res.status(200).json(allUsers)
    }
    async userInfo(req: RequestWithParams<{id: string}>, res: Response) {
        const info: Users | null = await AdminService.getInfo(req.params.id)

        return res.status(200).json(info)
    }
    async changeRole(req: RequestWithParams<{id: string}>, res: Response) {
        const updatedUsers: Users = await AdminService.updateRole(req.params.id)

        return res.status(200).json(updatedUsers)
    }
    async deleteUser(req: RequestWithParams<{id: string}>, res: Response) {
        const deletedUser = await AdminService.deleteUser(req.params.id)

        return res.status(204).json(deletedUser)
    }
    async deleteUsers(req: Request, res: Response) {
        return
    }
}

export default new AdminController()