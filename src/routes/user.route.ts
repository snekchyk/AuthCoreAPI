import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/', userController.information)
userRouter.patch('/update', userController.update)
userRouter.delete('/delete', userController.delete)

export { userRouter }
