import express from "express";
const requestsRouter=express.Router();
import { receivedReq, sendedReq } from "../controller/requests.js";

requestsRouter.post("/request/send/:status/:toUserId",sendedReq);
requestsRouter.post("/request/review/:status/:requestId",receivedReq)
export default requestsRouter;