
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
    response.send("express is working!!")
})

app.use(cors())
app.get("/productDetail",(request,response)=>{
    const review = [];
    const {url} = request.query;
    const browser   =  playwright.chromium.launch({headless:true})
    response.send("testing")

})

app.listen(PORT,()=>{
    console.log("connected")
})
