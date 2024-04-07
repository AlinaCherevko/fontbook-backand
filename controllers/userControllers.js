import {
  isUserExist,
  createUser,
  logoutUser,
  updateUserWithToken,
  updateUser,
} from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import path from "path";
import gravatar from "gravatar";
import fs from "fs/promises";
import Jimp from "jimp";
import { AVATAR_IMG_SIZES } from "../constants/user-constants.js";

const avatarsPath = path.resolve("public", "avatars");

export const registerUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await isUserExist(email);
    if (user) {
      throw HttpError(409, "Email in use!");
    }
    const avatarURL = gravatar.url(req.body.email, { s: 250, d: "mp" });
    const newUser = await createUser({ ...req.body, avatarURL });

    res.status(201).json({
      user: { name, email, avatarURL },
      token: newUser.token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await isUserExist(email);
    if (!user) {
      throw HttpError(401, "Wrong email or password");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw HttpError(401, "Wrong email or password");
    }
    const { name, token, avatarURL } = await updateUserWithToken(user._id);
    console.log(avatarURL);
    const response = { user: { email, name, avatarURL }, token };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res) => {
  await logoutUser(req.user._id);
  res.sendStatus(204);
};

export const currentUser = (req, res) => {
  const { name, email, avatarURL } = req.user;

  res.json({ name, email, avatarURL });
};

export const updateAvatar = async (req, res) => {
  const { _id, email } = req.user;

  if (!req.file) {
    throw HttpError(400, "No attached file");
  }

  const { path: oldPath, filename } = req.file;
  const { height, width } = AVATAR_IMG_SIZES.small;
  const newFileName = `${email}-${width}x${height}-${filename}`;
  const newPath = path.join(avatarsPath, newFileName);

  const avatarImg = await Jimp.read(oldPath);

  await avatarImg.resize(width, height).write(newPath);

  await fs.unlink(oldPath);

  const avatarURL = path.join("avatars", newFileName);
  await updateUser({ _id }, { avatarURL });

  res.json({ avatarURL });
};
