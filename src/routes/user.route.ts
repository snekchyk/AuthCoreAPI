import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import {authMiddleware} from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.get('/information', authMiddleware, userController.information)
userRouter.patch('/update', authMiddleware, userController.update)
userRouter.delete('/delete', authMiddleware, userController.delete)

export { userRouter }
