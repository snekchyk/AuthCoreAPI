import { Router } from 'express'
import { authRouter } from './auth.route.js'
import { userRouter } from './user.route.js'
import { adminRouter } from './admin.route.js'

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/me', userRouter)
mainRouter.use('/admin', adminRouter)

export { mainRouter }