const Router = require('koa-router'); //引入路由管理模块
const music = require("../control/music");

const router = new Router;

//处理根路由
router.get('/',music.home);

//处理歌曲搜索路由
router.get('/query',music.query);

//处理地区分类路由 
router.get('/top',music.top)

//处理歌词路由
router.get('/lyric',music.lyric);

//处理歌曲路由
router.get('/music',music.musics);

module.exports = router;