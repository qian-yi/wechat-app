import PageModule from "../lib/Page.js";
import { request } from "../common/const.js";

const $page = new PageModule({
  //加载事件,用来初识化数据
  onLoad(){
    Object.assign(this.data, {
      url: "",//请求的url
	  start: 0, //截取开始的参数
	  end: 20,	//截取结束参数
	  num: 20, //截取数目
	  row: 1,
      songs: [],//数据容器数组
      stock : false // 初识库存为false  ,false代表有数据可以搜搜
    });
  },

  //加载数据
  loadPage() {
    //判断数据是否加载完毕
    if (this.data.stock) {
      return wx.showToast({
        icon: "none",
        title: '没有更多了',
      });
    }

    //打包url参数
    const url = this.data.url +"&num="+ this.data.num +"&page="+ this.data.row;

    //显示加载图标
    wx.showLoading();

    //发送请求开始加载数据   
    const res_data = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        success: resolve
      });
    });

    //数据加载完毕,开始处理数据
    res_data.then(this.codePage.bind(this))
  },

  //处理数据
  codePage(res) {
    //请求拿到的数据
    const data = res.data,
		songs = data.songlist || data.data;

    //隐藏加载图标
    wx.hideLoading();

    //更新歌单
	const playerSongs = data.songlist ? songs.slice(this.data.start, this.data.end) : songs;
	this.data.songs.push(...(playerSongs.filter(v => v.albummid)));
	
    //判断页数是否加载完毕
	this.data.stock = this.data.end >= (data.cur_song_num || data.totalnum);

    //更新数据
    this.setData({
      songs: this.data.songs
    });
  },

  //加载更多
  morePage() {
    this.data.start += this.data.num;
	this.data.end += this.data.num;
	this.data.row++;

    this.loadPage();
  },

  //图片加载错误
  imgLoadError(event){
    //默认图片
    let imgUrl = "/images/default_album.jpg",
      song = event.target.dataset.song;

    let index = this.data.songs.findIndex(item => item.song_mid === song.song_mid);

    if (index > -1){
      this.data.songs[index].album_min = imgUrl
      this.data.songs[index].album_big = imgUrl;
      this.setData({ songs: this.data.songs});
    }
  }
});

export default $page;