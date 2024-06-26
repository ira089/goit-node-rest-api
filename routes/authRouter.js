import express from "express"
import * as authControllers from "../controllers/authControllers.js"
import * as usersSchemas from "../schemas/usersSchemas.js";
import validateBody from '../helpers/validateBody.js'
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/uploads.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchemas.userSignupSchema),authControllers.signup);

authRouter.post("/login", validateBody(usersSchemas.userSignupSchema),authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent );

authRouter.post("/logout", authenticate, authControllers.signout );

authRouter.patch("/", validateBody(usersSchemas.userUpSubcription), authenticate, authControllers.updateSubscription );

authRouter.post("/avatars", authenticate, upload.single("avatar"), authControllers.updateAvatar );

authRouter.get("/verify/:verificationToken", authControllers.verify );

authRouter.post("/verify", validateBody(usersSchemas.userEmailSchema), authControllers.resendVerify );

export default authRouter