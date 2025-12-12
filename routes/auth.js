import express from "express";
import {signup,login, logout, updatePassword} from "../controller/auth.js";
import { joiValidation } from "../utils/middlewares.js";

const authRouter=express.Router();
authRouter.post("/signup",joiValidation,signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.patch("/updatePassword",updatePassword);

export default authRouter;