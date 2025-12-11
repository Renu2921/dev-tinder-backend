import express from "express";
import { profile } from "../controller/profile.js";
const profileRouter=express.Router();

profileRouter.get("/profile",profile);

export default profileRouter;