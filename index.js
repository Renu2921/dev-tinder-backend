import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authValidation } from "./utils/middlewares.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestsRouter from "./routes/requests.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import http from "http";
import { initlializeSocket } from "./utils/ChatSocket.js";
import chatRouter from "./routes/chat.js";


const server=http.createServer(app);
initlializeSocket(server);

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is connected Successfully");
  } catch (error) {
    console.log(error);
  }
}
dbConnection();

app.use(cors({
  origin:["http://localhost:5173",
    "https://dev-tinder29.netlify.app"
  ],
  credentials:true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",authValidation,profileRouter);
app.use("/", authValidation,requestsRouter );
app.use("/",authValidation,userRouter);
app.use("/",authValidation,chatRouter);



server.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
