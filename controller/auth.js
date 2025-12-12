import User from "../models/users.js";
import userSchema from "../utils/joiSchemaValidation.js";
import bcrypt from "bcrypt";

export const signup=async (req, res) => {
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({ ...user, password: hashedPassword });
    await newUser.save();
    res
      .status(200)
      .send({
        success: true,
        data: newUser,
        message: "New user added successfully",
      });
  } catch (error) {
    res.status(401).send({ success: false, message: error.message });
  }
}

export const login=async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    const matchedPassword = await user.comparePassword(password);
    if (!matchedPassword) {
      return res
        .status(404)
        .send({ success: false, message: "Incorrect Password!!" });
    }

    const token = user.generateToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
    });
    res.status(200).send({ success: true, message: "Login Successfully!!" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token")  
        res.status(200).json({success:true,message:"User Logout successfully!!"});
    }catch(error){
        res.status(404).json({success:false,message:"Something went wrong!!"})
    }
}

export const updatePassword=async(req,res)=>{
    try{
     const requestedUser=req.body;
     const user=await User.findOne({email:requestedUser.email});
     const id=user._id;
     const password=requestedUser.password;
     const hashedPassword= await bcrypt.hash(password,10);
     const updatedPasswordUser=await User.findByIdAndUpdate(id, { password: hashedPassword },{runValidators:true,new:true});
     res.status(200).json({success:true,data:updatedPasswordUser,message:"Password Updated Successfully!"});

    }catch(error){
      res.status(404).json({success:false,message:error.message});
    }
}