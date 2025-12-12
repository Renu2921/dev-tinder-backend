import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

const userSchema=new mongoose.Schema({
     firstName:{
        type:String,
        required:true
     },
     lastName:{ 
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true,     //this automatically do the indexing to make search faster
        lowercase:true,
        trim:true
     },
     password:{
        type:String,
        required:true,
        minLength:[8,"Min length should be 8"]
     },
     age:{
        type:Number,
        min:[16,"Min age should be 16 years"]
     },
     gender:{
        type:String,
        enum:["male","female","other"]
     },
     imageUrl:{
        type:String,
        default:"https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
     },
     about:{
        type:String,
        default:"This is default about of user"
     },
     skills:{
        type:[String]
     }, 
     
     },
      {timestamps:true},
);

userSchema.methods.generateToken=function(){
    const user=this;   //here this is the current user
    const token=jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
       );
       return token;
};

 userSchema.methods.comparePassword=async function(password){
   return await bcrypt.compare(password,this.password);
 }

 const User=mongoose.model("User",userSchema);
 export default User;