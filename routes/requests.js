import express from "express";
const requestsRouter=express.Router();
import { requests } from "../controller/requests.js";

requestsRouter.post("/sentConnectionReq",requests);
export default requestsRouter;