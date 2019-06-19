import PageModule from "../../lib/Page.js";
import utlis from "../../utlis/utlis.js";

//获取云端数据库集合
const db = wx.cloud.database(),
      song_chat = db.collection("song_chat");//获取到云端的数据集合

const $page = new PageModule({
  data : {
    chat : "",
    page : 1,
    row : 5,
    addChat : 0,
	num: 0,
	stock: false,
    chatList :[]
  },

  onLoad(song){
    //设置标题
    wx.setNavigationBarTitle({
      title: `${song.songname}`,
    });

    //更新到页面
    this.setData({ song});

    //获取用户信息
    utlis.getUserInfo()
          .then(userData=>{
            this.data.user = userData;
          });

    //获取歌曲评论
    this.getChat();
  },

  //滚动加载更多
  moreChat(){
    this.data.page++;
    this.getChat();
  },

  //设置数据
  setChat(data){
    //隐藏顶部导航的加载图标
    wx.hideNavigationBarLoading();

    const dataArr = data.data,
		  datas = dataArr.slice(this.data.page * this.data.row - this.data.row + this.data.addChat, this.data.page * this.data.row);

	//总评论数
	this.data.num = dataArr.length;

    //遍历设置月份
    datas.forEach(item=>{
      item["time"] = (date=>{
        return `${date.getMonth() + 1}月${date.getDate()}日`;
      })(new Date(item["time"]));
    });

    const chatList = this.data.chatList;

	//判断评论是否加载完
	  if (this.data.num < this.data.row){
		  this.data.stock = this.data.page * this.data.row - this.data.row > this.data.num;
	  }else{
		  this.data.stock = this.data.page * this.data.row > this.data.num;
	  }
	
	
	//判断数据是否加载完毕
	  if (this.data.stock) {
		return wx.showToast({
			icon: "none",
			title: '评论已加载完'
		});
	}
    chatList.push(...datas);

    this.setData({chatList});
  },

  //获取歌曲的评论列表
  getChat(){
    //显示顶部导航的加载图标
    wx.showNavigationBarLoading();

    return song_chat
          .where({
            "songmid" : this.data.song.songmid
          })
          //从哪里开始取数据
      	//   .skip(this.data.page * this.data.row - this.data.row + this.data.addChat)
        //   .limit(this.data.row)
          .orderBy("time","desc")
          .get()
          .then(this.setChat.bind(this))
  },

  //提交评论的事件
  addChat(event){
    //清空input
    this.setData({chat : ""});

    //获取用户评论信息
    const chat = event.detail.value.chat;

    //如果数据为空
    if (!chat.trim()){
      wx.showToast({
        icon: "none",
        title: '请输入评论',
      });
	  return;
    }

    //需要添加评论的信息
    const data = {
      chat,
      songmid: this.data.song.songmid,
      user: this.data.user
    };

    //添加评论,发送到云端
    wx.cloud.callFunction({
      name: "addChat",
      data: data,
      success :(res)=>{
        //评论成功
        if (res.result){
          //一个立即生效的评论
          data.userInfo = data.user;

          data.time = (date => {
            return `${date.getMonth() + 1}月${date.getDate()}日`;
          })(new Date());

          this.data.chatList.unshift(data);
          this.setData({ chatList : this.data.chatList});

          //序号+1
          this.data.addChat+=1;

          wx.showToast({
            icon : "none",
            title: '添加评论成功',
          });
        }
      },
      fail(error) {
        wx.showToast({
          title: '服务器发送错误~',
        });
      }
    });
  }
});

$page.start();