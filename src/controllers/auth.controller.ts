import { Request, Response} from 'express'
import AuthService from '../services/auth.service.js'

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const newUser = await AuthService.register(
                req.body.name,
                req.body.password,
                req.body.email,
                req.body.age
            )

            res.status(201).json(newUser)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(
                req.body.name,
                req.body.password
            )

            res.status(201).json(result)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default new AuthController()