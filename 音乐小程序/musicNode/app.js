const Koa = require('koa');
const cors = require('@koa/cors'); //引入跨域模块

const app = new Koa();

const router = require('./router/router.js');

// 当数据和大于返回的所有数据时, 就不再返回请求了;
app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000,"127.0.0.1",()=>{
    console.log("正在监听3000端口");
});
