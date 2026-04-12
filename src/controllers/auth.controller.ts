import { Request, Response} from 'express'

class AuthController {
    async register(req: Request, res: Response) {
        const { name, password, email, age } = req.body
        res.status(200).json({name, password, email, age})
    }

    async login(req: Request, res: Response) {
        const {name, password} = req.body
    }
}

export default new AuthController()