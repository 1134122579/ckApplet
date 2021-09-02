// pages/hardware/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  go(e) {
    let {
      name
    } = e.currentTarget.dataset
    console.log(name)
    switch (name) {
      case "原料入库":
        wx.navigateTo({
          url: '/pages/hardware/staple',
        })
        break;
        case "原料出库":
          wx.navigateTo({
            url: '/pages/hardware/satapleout',
          })
          break;
      case "五金仓入库":
        wx.navigateTo({
          url: '/pages/hardware/hardware',
        })
        break;
      case "五金仓出库":
        wx.navigateTo({
          url: '/pages/hardware/hardwareout',
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