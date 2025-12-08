import express from "express";
const app=express();


app.use("/dashboard",(req,res)=>{
    res.send("Namaste i am Dashboard page!");
})
app.use("/home",(req,res)=>{
    res.send("Namaste i am home page!");
})

app.listen(3000,()=>{
    console.log("Server is listening the port 3000");
})