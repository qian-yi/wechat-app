const request = require('request'); //引入发起请求模块

function requestUrl(type, num, page, s) {
    const url = {
        queryUrl: `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?jsonpCallback=aSide&uin=0&w=${s}&n=${num}&p=${page}`,

        topIdUrl: `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?uin=0&topid=${num}`,

        lyricsUrl: `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?jsonpCallback=aSide&songmid=${num}`,

        musicUrl: `https://u.y.qq.com/cgi-bin/musicu.fcg?data={"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"${num}","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer",
        "method":"CgiGetVkey","param":{"guid":"${num}","songmid":["${page}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":0,"cv":0}}`
    };
    const options = {
        url: url[type],
        headers: {
            "referer": 'http://y.qq.com',
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
            "accept-Language": "zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "pgv_pvi=5549497344; pt2gguin=o0032639971; RK=7D7MzTSwMk; ptcz=bfcc6eafbdaaf574417dd590cb15f70a141407e3636c2641e6f7e27e70060eff; pgv_pvid=1439723918; ts_uid=2456318820; yq_index=0; eas_sid=p1Q5D3P8H732Q5P7P302K97997; luin=o0032639971; lskey=0001000009e072172756231eac46626b16d43647ddc32f33eb2018f7dae5326b2940a3a60a02f8b5736e004b; p_luin=o0032639971; p_lskey=00040000390252058e347b32f744b8168fb0471b6262fd523198ed3447472342b9f395e58e58e3147e2aa50e; ptui_loginuin=347784533; ts_refer=ADTAGh5_playsong; yqq_stat=0; pgv_info=ssid=s8687109340; ts_last=y.qq.com"
        }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, response, body) => {
            err ? reject(err) : resolve(body);
        });
    });
}

module.exports = {requestUrl};