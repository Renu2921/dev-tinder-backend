import ConnectionReq from "../models/connectionReq.js";
import User from "../models/users.js";
export const sendedReq=async(req, res) => {
  try {
    const fromUserId=req.user._id;   //id from loggedIn user,
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    const allowedStatus=["ignored","interested"];
    if(!allowedStatus.includes(status)){
       return res.status(400).json({success: false,message: `Invalid status. Allowed values are: ${allowedStatus.join(", ")}`
    });
    }

    if (fromUserId.toString() === toUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a request to yourself"
      });
    }

    const toUser=await User.findById(toUserId);
    if(!toUser){
        return res.status(400).json({
        success: false,
        message: "To user is not exist",
      });
    }

   const existingRequest = await ConnectionReq.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already exists between these users"
      });
    }

    const newReq=new ConnectionReq({fromUserId,toUserId,status});
    await newReq.save();
    res.status(200).json({success:true,data:newReq,message:req.user.firstName+ " " + status +" in " + toUser.firstName+ " profile"})
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
};

export const receivedReq=async(req,res)=>{
    try{
        const loggedInUser=req.user;   //here this is the loggedin user and who accept the req
        const {status,requestId}=req.params;
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(404).json({success:false,message: `Invalid status. Allowed values are: ${allowedStatus.join(", ")}`})
        }


        const connectionReqValid=await ConnectionReq.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        });
        if(!connectionReqValid){
           return res.status(404).json({success:false,message:"Such type of request not found"});
        };
         console.log(connectionReqValid);
        connectionReqValid.status=status;
        const data=await connectionReqValid.save();
        res.status(200).json({success:true,data:data,message:"Request updated successfullly!!"})


    }catch(error){
        res.status(404).json({success:false,message:error.message});
    }
}