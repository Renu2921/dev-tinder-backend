import mongoose from "mongoose";

const connectionReqSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{Value} is incorrect status type` 
        }
    }
},
{timestamps:true}

);

connectionReqSchema.index({fromUserId:1,toUserId:1});
const ConnectionReq=mongoose.model("ConnectionReq",connectionReqSchema);
export default ConnectionReq;
