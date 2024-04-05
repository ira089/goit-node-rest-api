import express from "express"
import * as authControllers from "../controllers/authControllers.js"
import * as usersSchemas from "../schemas/usersSchemas.js";
import validateBody from '../helpers/validateBody.js'
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchemas.userSignupSchema),authControllers.signup);

authRouter.post("/login", validateBody(usersSchemas.userSignupSchema),authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent );

authRouter.post("/logout", authenticate, authControllers.signout );

authRouter.patch("/", validateBody(usersSchemas.userUpSubcription), authenticate, authControllers.updateSubscription );

export default authRouter