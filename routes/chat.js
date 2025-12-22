import express from "express";
import { chat } from "../controller/chat.js";
const chatRouter=express.Router();

chatRouter.get("/chat/:id",chat);
export default chatRouter;