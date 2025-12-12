import express from "express";
import { myFeed, myMatches,requests } from "../controller/user.js";
const userRouter=express.Router();

userRouter.get("/request/received",requests);
userRouter.get("/request/myMatches",myMatches);
userRouter.get("/myFeed",myFeed)

export default userRouter;