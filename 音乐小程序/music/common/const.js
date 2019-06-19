//国家地区
export const region = [
	{ name: "欧美", id: 3 },
	{ name: "内地", id: 5 },
	{ name: "港台", id: 6 },
	{ name: "韩国", id: 16 },
	{ name: "日本", id: 17 }
];

//推荐歌单
export const sheet = [
	{ name: "热门歌曲", id: 26 },
	{ name: "新歌专辑", id: 27 },
	{ name: "网络歌曲", id: 28 }
];

//请求url
export const request = {
	//服务器主机
	host: "http://47.97.117.91:3000/"
};
request.topid = request.host + "top?topidurl=";//地区
request.query = request.host + "query?s=";//搜索
request.lyrics = request.host + "lyric?lyrics=";//歌词
request.music = request.host + "music?songid="; //歌曲地址
