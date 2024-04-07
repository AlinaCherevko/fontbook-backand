import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import {
  registerUser,
  loginUser,
  currentUser,
  signout,
  updateAvatar,
} from "../controllers/userControllers.js";
import { upload } from "../middlewares/upload.js";
import { authenticate } from "../middlewares/authenticate.js";

const userRoute = express.Router();

userRoute.post("/signup", validateBody(registerSchema), registerUser);
userRoute.post("/login", validateBody(loginSchema), loginUser);
userRoute.post("/logout", authenticate, signout);
userRoute.get("/current", authenticate, currentUser);
userRoute.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default userRoute;
