import express from "express"
import * as authControllers from "../controllers/authControllers.js"
import userSignupSchema from "../schemas/usersSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";
import validateBody from '../helpers/validateBody.js'

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema),authControllers.signup);

authRouter.post("/login", validateBody(userSignupSchema),authControllers.signin);

export default authRouter