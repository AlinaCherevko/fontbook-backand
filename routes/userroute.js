import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  registerSchema,
  loginSchema,
  updateNameSchema,
} from "../schemas/userSchema.js";
import {
  registerUser,
  loginUser,
  currentUser,
  signout,
  updateAvatar,
  updateName,
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

userRoute.patch(
  "/update/name",
  authenticate,
  validateBody(updateNameSchema),
  updateName
);

export default userRoute;
