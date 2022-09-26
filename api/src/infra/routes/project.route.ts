import ExpressAdapter from "../../core/adapter/ExpressAdapter"
import ProjectController from "../../controller/ProjectsController"
import { Router } from "express"

const ProjectRoutes = Router()

ProjectRoutes.get("/", ExpressAdapter.create(ProjectController.index))
ProjectRoutes.get("/:id", ExpressAdapter.create(ProjectController.show))
ProjectRoutes.post("/", ExpressAdapter.create(ProjectController.save))
ProjectRoutes.put("/:id", ExpressAdapter.create(ProjectController.update))
ProjectRoutes.delete("/:id", ExpressAdapter.create(ProjectController.destroy))

export default ProjectRoutes;