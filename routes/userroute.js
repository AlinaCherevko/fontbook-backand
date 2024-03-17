import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/userSchema.js";
import { registerUser } from "../controllers/userControllers.js";
const userRoute = express.Router();

userRoute.post("/signup", validateBody(registerSchema), registerUser);
userRoute.post("/login");
userRoute.post("/logout");
userRoute.get("/current");

export default userRoute;
