import Chat from "../models/chat.js";

export const chat=async(req,res)=>{
    try{
      const loggedInUserId=req.user._id;
      const {id}=req.params;
      let chat=await Chat.findOne({
        participents:{$all:[loggedInUserId,id]}
      }).populate("messages.sender","firstName lastName");
      if(!chat){
        chat=new Chat({ 
            participents: [loggedInUserId, id],
              messages: []
            })
      };
       await chat.save();
       res.status(200).json({success:true,message:"Chat found successfully",data:chat});


    }catch(error){
        res.status(404).json({message:error.message,success:false});
    }
}