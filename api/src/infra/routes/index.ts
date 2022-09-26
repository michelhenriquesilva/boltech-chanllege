import { Router } from 'express';
import AuthenticationRoutes from './authentication.routes';
import ProjectRoutes from './project.route';
import SignUpRoutes from './signup.routes';
import TaskRoutes from './task.routes';

const routes = Router();

routes.use('/signin', AuthenticationRoutes);
routes.use('/signup', SignUpRoutes);
routes.use('/projects', ProjectRoutes);
routes.use('/tasks', TaskRoutes);

export default routes;