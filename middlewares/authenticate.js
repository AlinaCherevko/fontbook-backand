import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { findUserById } from "../services/userServices.js";

export const authenticate = async (req, res, next) => {
  const { SECRET_JWT } = process.env;

  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw HttpError(401);
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw HttpError(401);
    }

    const { id } = jwt.verify(token, SECRET_JWT);

    const user = await findUserById(id);

    if (!user || !user.token || user.token !== token) {
      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
