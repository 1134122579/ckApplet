// pages/orderlist/index.js
import Api from "../../api/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_fuliaoList: true, //辅料列表
    is_orderList: false, //辅料列表
    fuliaoItem: {}, //选中的辅料
    showOneButtonDialog: false,
    oneButton: [{
      text: '确定'
    }],
    listQuery: {
      page: 1,
      pageSize: 10
    },
    error: '',
    isDisabled: false,
    sureId: '',
    getData: {
      order_no: '',
      code: '',
      name: '',
      dec: '',
      num: '',
      px: '个',
      location: ''
    },
    list: [],
    sureFuliaoId: '',
    fuliaolist: []
  },
  // 获取订单号
  getOrderList() {
    let {
      listQuery
    } = this.data
    Api.getOrderList(listQuery).then(res => {
      this.setData({
        list: res
      })
    })
  },

  tapDialogButton(e) {
    console.log(e)
    this.setData({
      showOneButtonDialog: false,
      isDisabled: false,
    })
  },
  // 确认订单号  获取辅料列表
  getfuliaoList() {
    let that = this
    let {
      sureId
    } = this.data
    if (!sureId) {
      this.setData({
        error: '请选择订单号'
      })
      return
    }
    this.setData({
      isDisabled: true
    })
    Api.getOrderSlaveList({
      order_no: sureId
    }).then(res => {
      that.setData({
        isDisabled: false,
        is_orderList: true,
        sureId,
        is_fuliaoList: false,
        fuliaolist: res
      })
    }).catch(() => {
      that.setData({
        isDisabled: false
      })
    })
  },
  scanCode() {
    let that = this
    let {
      fuliaolist,
      sureId
    } = this.data
    that.setData({
      isDisabled: false
    })
    wx.scanCode({
      onlyFromCamera: true,
      success(data) {
        console.log('扫码===', data.result)
        let is_fuliao = fuliaolist.indexOf(data.result) != -1
        if (is_fuliao) {
          wx.redirectTo({
            url: '/pages/orderlist/commodity?orderId=' + sureId + '&itemNo=' + data.result,
          })
        } else {
          that.setData({
            showOneButtonDialog: true
          })
        }
      },
      complete(res) {
        that.setData({
          isDisabled: false
        })
      }
    })
  },
  // 手选辅料
  suerFuliao() {
    let {
      sureId,
      sureFuliaoId,
      fuliaoItem
    } = this.data
    if (!sureFuliaoId) {
      this.setData({
        error: '请选择辅料号'
      })
      return
    }
    wx.redirectTo({
      url: '/pages/orderlist/commodity?orderId=' + sureId + '&itemNo=' + sureFuliaoId,
    })
  },
  onClickFuliao(event) {
    let {
      id
    } = event.currentTarget.dataset
    let {
      fuliaolist
    } = this.data
    fuliaolist.forEach(item => {
      if (item.bar_code == id) {
        this.setData({
          sureFuliaoId: id,
          fuliaoItem: item
        })
      }

    })
  },
  // 选择订单
  onClick(event) {
    let {
      id
    } = event.currentTarget.dataset
    let {
      list
    } = this.data
    list.forEach(item => {
      if (item.order_no == id) {
        this.setData({
          sureId: id,
          // sureList: item.list
        })
      }
    })
    console.log(event)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '辅料出库',
    })
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
    this.getOrderList()
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