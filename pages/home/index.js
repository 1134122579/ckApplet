// pages/home/index.js
import Api from "../../api/index"
import cache from '../../utils/cache'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getIsLogin(event) {
    let {
      is_login
    } = App.globalData
    let {
      text
    } = event.currentTarget.dataset
    console.log(is_login, event)
    if (is_login) {
      wx.redirectTo({
        url: '/pages/login/index',
      })
      return
    }
    switch (text) {
      case "辅料入库":
        wx.navigateTo({
          // url: '/pages/accessories/index',
          url: '/pages/newaccessories/index',
        })
        break;
      case "辅料出库":
        wx.navigateTo({
          url: '/pages/orderlist/index',
        })
        break;
      case "余料入库":
        wx.navigateTo({
          url: '/pages/oddments/index',
        })
        break;
        case "成品入库":
          wx.navigateTo({
            url: '/pages/turnoff/index',
          })
          break;
      case "成品装柜":
        wx.navigateTo({
          url: '/pages/sendOrder/index',
        })
        break;
      case "原料入库":
        wx.navigateTo({
          url: '/pages/hardware/index',
        })
        break;
        case "人工登记":
          wx.navigateTo({
            url: '/pages/staff/index',
          })
          break;
      default:
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 判断是否登录
  let {is_login}=  App.globalData
  if(is_login){
    wx.redirectTo({
      url: '/pages/login/index',
    })
  }

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})