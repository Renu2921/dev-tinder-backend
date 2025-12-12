import express from "express";
const requestsRouter=express.Router();
import { requests } from "../controller/requests.js";

requestsRouter.post("/request/send/:status/:toUserId",requests);
export default requestsRouter;