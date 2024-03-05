
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
    (async()=>{
        const browser   =  await playwright.chromium.launch({headless:true})
        const context   =  await browser.newContext();
        const page      =  await context.newPage()

        const url = "https://www.amazon.com/dp/B0BP9SNVH9/";

        

    })
    
    response.send("testing")

})

app.listen(PORT,()=>{
    console.log("connected")
})
