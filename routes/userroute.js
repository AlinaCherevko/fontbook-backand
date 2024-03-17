import express from "express";

const userRoute = express.Router();

userRoute.post("/signup");
userRoute.post("/login");
userRoute.post("/logout");
userRoute.get("/current");

export default userRoute;
