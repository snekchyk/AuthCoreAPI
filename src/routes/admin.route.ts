import { Router } from 'express'
import adminController from '../controllers/admin.controller.js'
import {roleMiddleware} from "../middlewares/role.middleware.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const adminRouter = Router()

adminRouter.get('/users', authMiddleware, roleMiddleware('ADMIN'), adminController.allUsers)
adminRouter.get('/users/:id', authMiddleware, roleMiddleware('ADMIN'), adminController.userInfo)
adminRouter.patch('/users/:id/role', authMiddleware, roleMiddleware('ADMIN'), adminController.changeRole)
adminRouter.delete('/users/:id', authMiddleware, roleMiddleware('ADMIN'), adminController.deleteUser)



export { adminRouter }