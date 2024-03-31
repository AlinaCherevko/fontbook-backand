import { User } from "../db/modals/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const isUserExist = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateUserWithToken = async (id) => {
  const { SECRET_JWT } = process.env;
  const token = jwt.sign({ id }, SECRET_JWT, { expiresIn: "10H" });
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { token },
    { new: true }
  );
  return updatedUser;
};

export const createUser = async (userData) => {
  const user = new User(userData);
  await user.hashPassword();
  await user.save();
  const newUser = await updateUserWithToken(user._id);
  return newUser;
};

export const logoutUser = async (id) =>
  await User.findByIdAndUpdate(id, { token: "" });
