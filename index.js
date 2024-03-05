
import express from 'express';
import playwright from 'playwright-core';
import cors from 'cors';
import awsChromium  from 'chrome-aws-lambda';
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
    const {url} = request.query;
    
    var page_number = 1;
    var next_btn = "cm_cr_arp_d_paging_btm_next_";
    var has_next = true;
    async function Detail(){

        const browser = await playwright.chromium.launch({
        headless: false,
        executablePath: awsChromium.executablePath,
    });
        const context   = await browser.newContext();
        const page      = await context.newPage({bypassCSP:true})

        await browser.close();
    }

    Detail();
})

app.listen(PORT,()=>{
    console.log("connected")
})
