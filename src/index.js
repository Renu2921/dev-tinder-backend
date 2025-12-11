import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authValidation } from "../utils/authMiddleware.js";
import authRouter from "../routes/auth.js";
import profileRouter from "../routes/profile.js";
import requestsRouter from "../routes/requests.js";

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is connected Successfully");
  } catch (error) {
    console.log(error);
  }
}
dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",authValidation,profileRouter);
app.use("/", authValidation,requestsRouter );




// app.get("/feed", authValidation, async (req, res) => {
//   try {
//     const users = await User.find();
//     res
//       .status(200)
//       .send({
//         success: true,
//         data: users,
//         message: "Users found Successfully!",
//       });
//   } catch (error) {
//     res.status(401).send({ success: false, message: error.message });
//   }
// });

// app.get("/feed/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findById(id);
//     if (!user) {
//       return res
//         .status(401)
//         .send({ success: false, message: "User not found!" });
//     }
//     res
//       .status(200)
//       .send({ success: true, data: user, message: "User found Successfully!" });
//   } catch (error) {
//     res.status(401).send({ success: false, message: error.message });
//   }
// });

// app.patch("/feed/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const user = await User.findByIdAndUpdate(id, data, {
//       new: true,
//       runValidators: true,
//     });
//     res
//       .status(200)
//       .send({
//         success: true,
//         data: user,
//         message: "User Updated Successfully",
//       });
//   } catch (error) {
//     res.status(401).send({ success: false, message: error.message });
//   }
// });

// app.delete("/feed/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findByIdAndDelete(id);
//     res
//       .status(200)
//       .send({
//         success: true,
//         data: user,
//         message: "User Deleted Successfull y",
//       });
//   } catch (error) {
//     res.status(401).send({ success: false, message: error.message });
//   }
// });



app.listen(3000, () => {
  console.log("Server is listening the port 3000");
});
