// app.js
import cache from './utils/cache'
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }

    })
    // 判断本地是否有token、 没有token重新登陆
   let token= cache.getToken()
   let userInfo=cache.getUserInfo()
   console.log("用户信息=",token,userInfo)
    if(token){
        this.globalData.is_login=false
        this.globalData.userInfo=userInfo
    }
},
  globalData: {
    userInfo: null,
    is_login:true, //true  需要登录 
  }
})
