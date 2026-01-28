import jwt from "jsonwebtoken";
import User from "../models/users.js"
import userSchema, { updateUserSchema } from "./joiSchemaValidation.js";

export const authValidation = async (req, res, next) => {
  try {
   const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({message:"token is not found!"});
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user= await User.findById(decode.id);
     req.user=user;    //it attach the user in req so we can access the current user anywhere we want
    next();
  } catch (error) {
    res.status(404).send({message:error.message});
  }
};

export const joiValidation=async(req,res,next)=>{
  const {error}=userSchema.validate(req.body);
  if(error){
    return res.status(400) .json({ success: false, message: error.details[0].message });
  }
  next();
}


export const updateJoiValidation=async(req,res,next)=>{
  const {error}=updateUserSchema.validate(req.body);
  if(error){
    return res.status(400) .json({ success: false, message: error.details[0].message });
  }
  next();
}