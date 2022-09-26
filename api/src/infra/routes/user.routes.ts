import ExpressAdapter from "../../core/adapter/ExpressAdapter"
import UserController from "../../controller/UserController"
import { Router } from "express"

const UserRoutes = Router()

UserRoutes.get("/", ExpressAdapter.create(UserController.index))
UserRoutes.get("/:id", ExpressAdapter.create(UserController.show))
UserRoutes.post("/", ExpressAdapter.create(UserController.save))
UserRoutes.put("/:id", ExpressAdapter.create(UserController.update))
UserRoutes.delete("/:id", ExpressAdapter.create(UserController.destroy))

export default UserRoutes;