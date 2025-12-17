import express from "express";
import { profile, profileEdit } from "../controller/profile.js";
import { joiValidation, updateJoiValidation } from "../utils/middlewares.js";
const profileRouter=express.Router();

profileRouter.get("/profile/view",profile);
profileRouter.put("/profile/edit",updateJoiValidation,profileEdit)
export default profileRouter;