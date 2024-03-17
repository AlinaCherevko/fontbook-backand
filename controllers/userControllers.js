import { isUserExist, createUser } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const registerUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await isUserExist(email);
    if (user) {
      throw HttpError(409, "Email in use!");
    }

    const newUser = await createUser(req.body);

    res.status(201).json({ user: { name, email }, token: newUser.token });
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
  } catch (error) {}
};
