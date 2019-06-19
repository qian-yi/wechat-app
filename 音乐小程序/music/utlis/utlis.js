import Storage from "../lib/Storage.js";

//对象转url参数
function objDeUCode(obj){
  return Object.keys(obj).map(item => item + "=" + encodeURIComponent(obj[item])).join("&");
}

//获取用户信息
function getUserInfo(){
  //获取app实例
  const $app = getApp().example;

  return new Promise((resolve,reject)=>{
    //储存用户信息的数据库
    const $user_db = new Storage('user_db'),
    	userInfo = $user_db.where("nickName","!=","").find();
    if (userInfo){
      return resolve(userInfo);
    }

    //查询授权信息里的用户信息
    wx.getUserInfo({
      success(res){
        resolve(res.userInfo)
      },
      fail(){
        //跳转到授权页面
        wx.redirectTo({
          url: '/pages/start/index',
        });
      }
    });
  });
}

export default{getUserInfo,objDeUCode};