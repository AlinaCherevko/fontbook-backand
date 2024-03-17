import { User } from "../db/modals/User.js";
export const isUserExist = async (email) => {
  const user = await User.findOne({ email });

  return user;
};
