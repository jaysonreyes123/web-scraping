
import express from 'express';
import playwright from 'playwright-core';
import cors from 'cors';
const app = express();
const PORT = 8082;
const URL = "https://www.amazon.com/";


const data = {
    title:"",
    star_rating:"",
    rating:"",
    image:"",
    review:"",
}

app.get("/",(request,response)=>{
    response.send("express is workingsssssssssssssssssss!!")
})

app.use(cors())
app.get("/productDetail",(request,response)=>{
    const review = [];
   response.send("working")
})

app.listen(PORT,()=>{
    console.log("connected")
})
