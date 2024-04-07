import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userroute.js";
dotenv.config();

import { connectDB } from "./db/connection.js";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

const { PORT } = process.env;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/contacts", contactsRouter);
app.use("/users", userRoute);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
});
