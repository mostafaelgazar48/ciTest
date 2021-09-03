/* const Page =  require('puppeteer/lib/Page');

Page.prototype.login = function(){
    const user=await userFactory();
    const {sessionString,signture}= sessionFactory(user);
    
    await this.setCookie({name:'session',value:sessionString})
    await this.setCookie({name:'session.sig',value:signture})
    
    await this.goto('localhost:3000/blogs')
}
 */