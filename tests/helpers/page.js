const puppeteer = require('puppeteer')
const sessionFactory = require('../factories/sessinFactory');
const userFactory = require('../factories/userFactory');


class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function (target, property) {
                return target[property] || browser[property] || page[property]
            }
        })
    }

    constructor(page) {
        this.page = page;
    }

    async login() {
        const user = await userFactory();
        const { sessionString, signture } = sessionFactory(user);

        await this.page.setCookie({ name: 'session', value: sessionString })
        await this.page.setCookie({ name: 'session.sig', value: signture })

        await this.page.goto('http://localhost:3000/blogs')
        this.page.waitFor('a[href="/auth/logout"]')

    }

    async extractContentOf (selector) {
      const text= await this.page.$eval(selector,el =>el.innerHTML);
      return text
    }
    
}


module.exports = CustomPage;