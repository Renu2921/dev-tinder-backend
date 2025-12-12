import { response } from "express";
import ConnectionReq from "../models/connectionReq.js";
import User from "../models/users.js";

export const requests=async(req,res)=>{
    try{
       const user=req.user;
       console.log(user);
       const incomingRequests=await ConnectionReq.find({toUserId:user._id,status:"interested"}).populate("fromUserId" ,"firstName lastName age gender iamgeUrl about");
       res.status(200).json({success:true,data:incomingRequests,message:"Pending Request List"});
    }
catch(error){
 res.status(404).json({success:false,message:error.message});
}
}


export const myMatches=async(req,res)=>{
    try{
      const loggedInUser=req.user;
      const myMatch=await ConnectionReq.find({
        $or:[
            {fromUserId:loggedInUser._id,status:"accepted"},
            {toUserId:loggedInUser._id,status:"accepted"},
        ]
        }) 
        .populate("fromUserId","firstName lastName age gender imageUrl about")
        .populate("toUserId","firstName lastName age gender imageUrl about");
          const connections=myMatch.map((item)=>{
              if(item.fromUserId._id.toString()===loggedInUser._id.toString()){
                     return item.toUserId;
        }
        return item.fromUserId;
    }) 
       

      res.status(200).json({success:true,data:connections,message:"My connections found successfully List"});
    }
catch(error){   
 res.status(404).json({success:false,message:error.message});
}
};


export const myFeed=async(req,res)=>{
    try{
      const loggedInUser=req.user;
      let {page=1,limit=10}=req.query;
      limit=limit>50?50:limit;
      const skip=(page-1)*limit;

const sentTo = await ConnectionReq.distinct("toUserId", {
  fromUserId: loggedInUser._id
});

const receivedFrom = await ConnectionReq.distinct("fromUserId", {
  toUserId: loggedInUser._id
});

const exclude = [...new Set([...sentTo, ...receivedFrom, loggedInUser._id])];
const freshFeed = await User.find({
  _id: { $nin: exclude }
}).skip(skip).limit(limit) .sort({ createdAt: -1 });
      


    
      res.status(200).json({success:true,data:freshFeed,message:"Feeds found sucessfully!!"});
    }catch(error){
       res.status(404).json({sucess:false,message:error.message});
    }
}
