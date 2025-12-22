import { Server } from "socket.io";
import crypto from "crypto";
import Chat from "../models/chat.js";

const getSecretRoomId = (loggedInUserId, id) => {
  return crypto
    .createHash("sha256")
    .update([loggedInUserId, id].sort().join("_"))
    .digest("hex");
};
export const initlializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin:["http://localhost:5173",
    "https://dev-tinder29.netlify.app"
  ],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);
    //    Event Handlers
    socket.on("joinChat", ({ firstName,lastName, loggedInUserId, id }) => {
      const roomId = getSecretRoomId(loggedInUserId, id);
      socket.join(roomId);
    });
    socket.on( "sendMessage",async ({ firstName,lastName, loggedInUserId, id, message }) => {
        try {
           const roomId = getSecretRoomId(loggedInUserId, id);
            io.to(roomId).emit("messageReceived", { firstName,lastName, message });
             // save chat in Db
          let chat = await Chat.findOne({
            participents: { $all: [loggedInUserId, id] },
          });
          if (!chat) {
            chat = new Chat({
              participents: [loggedInUserId, id],
              messages: [],
            });
          }
          chat.messages.push({ sender: loggedInUserId, message });
          await chat.save();
        } catch (error) {
          console.log(error.message);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};
