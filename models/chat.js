import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    message:{
        type:String,
        required:true
    }
},
    {timestamps:true}
)
const chatSchema=new mongoose.Schema({
    participents:[
        {type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
    ],
     messages:[messageSchema]
});

const Chat=mongoose.model("Chat",chatSchema);
export default Chat;