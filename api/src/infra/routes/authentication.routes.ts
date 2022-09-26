import ExpressAdapter from "../../core/adapter/ExpressAdapter"
import { Router } from "express"
import AuthenticationController from "../../controller/AuthenticationController"

const AuthenticationRoutes = Router()

AuthenticationRoutes.post("/", ExpressAdapter.create(AuthenticationController.signin))

export default AuthenticationRoutes;