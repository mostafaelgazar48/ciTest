const puppeteer = require('puppeteer');

const Page = require('./helpers/page');
let page;
beforeEach(async ()=>{
    page = await Page.build();
    await page.goto('http://localhost:3000')

})

afterEach(async () =>{
   await page.close()
})
test('check the text of the header',async ()=>{
   
    const text = await page.$eval('a.brand-logo',txt=> txt.innerHTML)

    expect(text).toEqual('Blogster')

})


test('clicking loigin by gmail ',async ()=>{
   
    await page.click('.right a');
    const url = await page.url();
    const validUrl=  url.includes('https://accounts.google.com');

    expect(validUrl).toBe(true)

})


test('sign in',async ()=>{
    await page.login();
    const logoutText = await page.extractContentOf('a[href="/auth/logout"]');
    expect(logoutText).toEqual('Logout')



})