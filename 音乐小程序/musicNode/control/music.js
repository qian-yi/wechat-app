const until = require('../until/until');
const request = require('../request/request');

//根路由管理
exports.home = (ctx) => {
    ctx.body = `<div>
    	<ul style="font-weight: bold;">
    		<li>
    			<p>搜索
    				<a href="http://127.0.0.1:3000/query?s=绿色&n=10&p=1">http://127.0.0.1:3000/query?s=绿色&n=10&p=1</a>
    			</p>
    			<ol>
    				<li>参数<b>s</b>必须</li>
    				<li>参数p<b>(可省)</b>: 默认1</li>
    				<li>参数n<b>(可省)</b>: 默认10</li>
    				<li>返回值:<b style='color: red;'>totalnum</b> 表示该次查找含有多少条数据, 需要自己判断是否已到达最大返回值, 超过返回空</li>
    				<li>返回值是json</li>
    			</ol>
    		</li>
    		<li>
    			<p>地区分类 
    				<a href="http://127.0.0.1:3000/top?topidurl=3">http://127.0.0.1:3000/top?topidurl=3</a>
    				<span style="display: block;margin: 5px 0 0 20px;">参数topidurl <b>(必须)</b> </span>
    				<ol>
    					<li>欧美: topidurl=3</li>
    					<li>内地: topidurl=5 </li>
    					<li>港台: topidurl=6</li>
    					<li>韩国: topidurl=16</li>
    					<li>日本: topidurl=17</li>
    					<li>热门歌曲: topidurl=26</li>
    					<li>新歌专辑: topidurl=27</li>
    					<li>网络歌曲: topidurl=28</li>
    					<li>返回值是json</li>
    				</ol>
    			</p>
    		</li>
    		<li>
    			<p>歌词 
    				<a href="http://127.0.0.1:3000/lyric?lyrics=000toHZo1K8Bec">http://127.0.0.1:3000/lyric?lyrics=000toHZo1K8Bec</a>
    			</p>
    			<p style="padding-left: 20px">参数: lyrics=songmid <b>必须</b></p>
    			<p style="padding-left: 20px">返回值是json</p>
    		</li>
    		<li>
    			<p>歌曲地址 
    				<a href="http://127.0.0.1:3000/music?songid=226989116&songmid=003GXh8T0u7JxK">http://127.0.0.1:3000/music?songid=226989116&songmid=003GXh8T0u7JxK</a>
    			</p>
    			<ol>
    				<li>参数songid <b>(必须)</b> 歌曲的songid </li>
    				<li>参数songmid <b>(必须)</b> 歌曲的songmid </li>
    				<li>返回值是数组</li>
    			</ol>
    		</li>
    	</ul>
    </div>`;
};

//歌曲搜索路由管理  http://127.0.0.1:3000/query?s=绿色&n=10&p=1
exports.query = async (ctx) => {
    const url = ctx.url;
	let {n, p, s} = until.codeUrl(url);
    await request.requestUrl('queryUrl', n, p, s).then(data => {
        ctx.body = until.queryCode(until.codeData(data));
    }).catch(err => {
        console.log(err);
    });
};

//地区分类路由管理  http://127.0.0.1:3000/top?topidurl=3
exports.top = async (ctx) => {
    const url = ctx.url;
    let {topidurl} = until.codeUrl(url);
    await request.requestUrl('topIdUrl', topidurl).then(data => {
        const _data = until.codeTopId(JSON.parse(data));
        ctx.body = _data;
    }).catch(err => {
        console.log(err);
    });
};

//歌词路由管理  http://127.0.0.1:3000/lyric?lyrics=000toHZo1K8Bec
exports.lyric = async (ctx) => {
    const url = ctx.url;
    let {lyrics} = until.codeUrl(url);
    await request.requestUrl('lyricsUrl', lyrics).then(data => {
        const _data = until.lyrics(until.codeData(data));
        ctx.body = _data;
    }).catch(err => {
        console.log(err);
    });
};

//歌曲路由管理  http://127.0.0.1:3000/music?songid=226989116&songmid=003GXh8T0u7JxK
exports.musics = async ctx => {
    const url = ctx.url;
    let {songid, songmid} = until.codeUrl(url);
    await request.requestUrl('musicUrl', songid, songmid).then(data => {
		let _data = JSON.parse(data);
		let req_data = _data.req_0.data;
        let purl = req_data.midurlinfo[0].purl;
        let url = req_data.sip.map(item => {return item + purl});
        ctx.body = url;
    })
};