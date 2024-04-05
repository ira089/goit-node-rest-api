import express from "express"
import * as authControllers from "../controllers/authControllers.js"
import * as usersSchemas from "../schemas/usersSchemas.js";
import validateBody from '../helpers/validateBody.js'
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/uploads.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchemas.userSignupSchema),authControllers.signup);

authRouter.post("/login", upload.single("tiger"), validateBody(usersSchemas.userSignupSchema),authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent );

authRouter.post("/logout", authenticate, authControllers.signout );

authRouter.patch("/", validateBody(usersSchemas.userUpSubcription), authenticate, authControllers.updateSubscription );

export default authRouter