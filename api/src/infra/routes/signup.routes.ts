import { Router } from "express";
import ExpressAdapter from "../../core/adapter/ExpressAdapter";
import SignUpController from "../../controller/SignUpController";

const SignUpRoutes = Router();
SignUpRoutes.post('/', ExpressAdapter.create(SignUpController.execute));

export default SignUpRoutes;