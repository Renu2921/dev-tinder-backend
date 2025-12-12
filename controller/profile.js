import User from "../models/users.js";

export const profile=async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ success: true, data: user,message: "Login user profile found successfully",});
  } catch (error) {
    res.status(404).send({ success: false, message: "Profile not found!" });
  }
}


export const profileEdit=async(req,res)=>{
    try{
        const user=req.user;    //this is current user loggedin, becoz we save user in the req.user when we check the authMiddleware
        const id=user._id;
        const data=req.body;
        const updatedUser=await User.findByIdAndUpdate(id,data,{new:true, runValidators:true});
        res.status(200).json({success:true,data:updatedUser,message:"Profile Edit successfully!!"});
    }catch(error){
        res.status(404).send({ success: false, message: error.message });
    }
}