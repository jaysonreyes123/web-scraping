
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
    
    var page_number = 1;
    var next_btn = "cm_cr_arp_d_paging_btm_next_";
    var has_next = true;
    
    (async()=>{

        const browser   = await playwright.chromium.launch({headless:true})
        const context   = await browser.newContext();
        const page      = await context.newPage({bypassCSP:true})

        

        while(has_next){
            const _url  = URL+url+"/ref="+next_btn+page_number+"?ie=UTF8&reviewerType=all_reviews&pageNumber="+page_number;

            await page.goto(_url,{timeout:0});
            let title;
            let _image;
            let star_rating
            let rating;
            try {
                await page.waitForSelector("a[data-hook='product-link']")
                title         = await page.$eval("a[data-hook='product-link']",(element)=>element.textContent.trim());
            } catch (error) {
                title         = "";
            }

            try {
                await page.waitForSelector("img[data-hook='cr-product-image']")
                const image         = page.locator("img[data-hook='cr-product-image']");
                      _image        = await image.getAttribute('src');
            } catch (error) {
                _image = "";
            }

            try {
                await page.waitForSelector("span[data-hook='rating-out-of-text']")
                star_rating     = await page.$eval("span[data-hook='rating-out-of-text']",(element)=>element.textContent.trim());
            } catch (error) {
                star_rating     = "";
            }
            
            try {
                await page.waitForSelector("div[data-hook='total-review-count']")
                rating      = await page.$eval("div[data-hook='total-review-count']",(element)=>element.textContent.trim());
                
            } catch (error) {
                rating      = "";   
            }
            
            data.title          = title; 
            data.image          = _image;
            data.star_rating    = star_rating;
            data.rating         = rating;

            const details = await page.$$eval(".review",(element)=>{
            return element.map((item)=>{
                const name              = item.querySelector(".a-profile-name");
                const review            = item.querySelector(".review-text-content");
                const date_review       = item.querySelector("span[data-hook='review-date']") ?? "";
                const rating            = item.querySelector(".review-rating");
                const badge             = item.querySelector("span[data-hook='avp-badge']") ?? "";
                const username          = item.querySelector("a.a-profile") ? item.querySelector("a.a-profile").getAttribute("href") :  "" ;

                //convert to text
                const Text              = (value) => value.innerText;

                return{
                            name    :Text(name),
                            date    :Text(date_review),
                            rating  :Text(rating).replace(" out of 5 stars",""),
                            badge   :Text(badge),
                            review  :Text(review),
                            username:username.split("/")[3]
                    }
                })
            })
            

            details.map((item)=>{
                review.push(item);
            })

            const next  = (await page.$("li.a-last")) || null;
            if(next == null){
                has_next = false;
            }
            else{
                const is_no_next = await page.$eval("li.a-last",(element)=>{
                    return element.classList.contains("a-disabled");
                })
                page_number++;
                if(is_no_next){
                    has_next = false;
                    break;
                }
            }
        }
        
        data.review = review;
        response.json({data:data})
        await browser.close();
    })

})

app.listen(PORT,()=>{
    console.log("connected")
})
