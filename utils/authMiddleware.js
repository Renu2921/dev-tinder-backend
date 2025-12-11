import jwt from "jsonwebtoken";
import User from "../models/users.js"

export const authValidation = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).send("token is not found!");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user= await User.findById(decode.id);
     req.user=user;
    next();
  } catch (error) {
    res.status(404).send({message:error.message});
  }
};
