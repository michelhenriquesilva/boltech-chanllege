import ExpressAdapter from "../../core/adapter/ExpressAdapter"
import TaskController from "../../controller/TaskController"
import { Router } from "express"

const TaskRoutes = Router()

TaskRoutes.get("/", ExpressAdapter.create(TaskController.index))
TaskRoutes.get("/:id", ExpressAdapter.create(TaskController.show))
TaskRoutes.post("/", ExpressAdapter.create(TaskController.save))
TaskRoutes.put("/:id", ExpressAdapter.create(TaskController.update))
TaskRoutes.delete("/:id", ExpressAdapter.create(TaskController.destroy))

export default TaskRoutes;