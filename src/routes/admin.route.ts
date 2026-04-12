import { Router } from 'express'
import adminController from '../controllers/admin.controller.js'

const adminRouter = Router()

adminRouter.get('/users', adminController.allUsers)
adminRouter.get('/users/:id', adminController.userInfo)
adminRouter.patch('/users/:id/role', adminController.changeRole)
adminRouter.delete('/users/:id', adminController.deleteUser)
adminRouter.delete('/users/', adminController.deleteUsers)



export { adminRouter }