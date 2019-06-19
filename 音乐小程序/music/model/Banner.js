/* 获取广告图信息 */
import AudioManager from "../lib/AudioManager.js";

export default class Banner{
  constructor(page){
    //监听一个广告图的动作信息
    Reflect.set(page, "actionBanner", Banner.actionBanner);
  }

  //跳转方法
  static actionBanner(event){
    const action = event.currentTarget.dataset.action;

    //是否为专题跳转
    if (action.atype === 0){
      wx.navigateTo({
        url: '/pages/sheet/list?id=' + action.data.id +"&name="+ action.data.name
      });
    }

    //是否专辑推荐
    if (action.atype === 1){
      AudioManager.setSong(action.data,[]);
      wx.navigateTo({
        url: `/pages/player/index?name=${action.data.songname}&mid=${action.data.songmid}`
      });
    }
  }

  //获取banner图信息
  getBanner(){
    const data = [];

    //banner图的类型有多种,有的是跳转专题,有的单曲推荐
    data.push({
	  	img: "http://p1.music.126.net/ulW4yJjxB8eAvInYOobNLg==/109951163621926009.jpg",
      	atype : 0,//专题
     	data : {
			id : 60,
			name: "抖音排行榜"
      	}
    });

    //单曲推荐
	data.push({
		img: "https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1246384.jpg",
		atype: 1,//单曲推荐
		data: {
			albummid: "0020fGTk3JOD19",
			songmid: "004MQXqz4CsAb6",
			songname: "Hard To Get",
			singer: "蔡徐坤",
			album_min: "https://y.gtimg.cn/music/photo_new/T002R90x90M0000020fGTk3JOD19.jpg",
			album_big: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000020fGTk3JOD19.jpg",
		}
	});

    data.push({
      img: "http://p1.music.126.net/eutlOcSlh-dtpWq328R6bQ==/109951163615791721.jpg",
      atype: 1,//单曲推荐
      data: {
		albummid: "004QnEHc3zjC7J",
        songmid: "001dPKD40OUxFz",
        songname: "耳朵",
        singer: "李荣浩",
        album_min: "https://y.gtimg.cn/music/photo_new/T002R90x90M000004QnEHc3zjC7J.jpg",
        album_big: "https://y.gtimg.cn/music/photo_new/T002R300x300M000004QnEHc3zjC7J.jpg",  
      }
    });

    // 真正banner图信息是从后台获取的,所以这里有回调,使用promise返回
    return new Promise((resolve)=>{
      resolve(data);
    });
  }
} 