import { isUserExist } from "../services/userServices.js"
import HttpError from "../helpers/HttpError.js";
export const registerUser = async(req, res, next)=> {

const{ email } = req.body;
try {
    const user =  await isUserExist(email)
    if(user) {
        throw HttpError(409, "Email in use!")
    }
} catch (error) {
    next(error);
}

}
