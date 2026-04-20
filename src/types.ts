import { Request } from 'express'
import {Users} from "@prisma/client";

export type RequestWithBody<B> = Request<{}, {}, B>
export type RequestWithUser = Request & { user: Users }