// pages/orderlist/index.js
import Api from "../../api/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOneButtonDialog: false,
    is_station: true, //工位选择
    is_orderList: false, //是否展示订单
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
      code: 123456,
      name: '名字',
      dec: '4*5',
      num: '',
      px: '个',
      location: ''
    },
    orderlist: [], //订单列表
    poperlist: [] //员工列表
  },
  // 第一步
  nextOut() {
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
    Api.getOrderInfo({
      order_no: sureId
    }).then(res => {
      console.log('校验订单信息===', res)
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/sendOrder/sendOrder?orderId=' + sureId,
      })
    })

    // this.setData({
    //   is_orderList:true,
    //   is_station:false
    // })
  },
  // 第二不
  nextTwoOut() {
    this.setData({
      is_station: true
    })
  },
  // 获取订单号
  getOrderList() {
    let {
      listQuery
    } = this.data
    Api.getOrderList(listQuery).then(res => {
      console.log(res)
      this.setData({
        orderlist: res
      })
    })
  },
  // 获取员工
  getstaff_list() {
    Api.staff_list().then(res => {
      console.log(res)
      this.setData({
        poperlist: res
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
  // 确认订单号
  // 扫码
  scanCode() {
    let that = this
    let {
      sureId
    } = this.data

    this.setData({
      isDisabled: true
    })
    wx.scanCode({
      // 取消  或者扫码错误
      fail: (res) => {
      },
      success(res) {
        let code = res.result
        console.log(res)
        wx.showLoading({
          title: '加载中..',
        })
        // 获取订单信息  校验有订单
        Api.getOrderInfo({
          order_no: code
        }).then(res => {
          console.log('校验订单信息===', res)
          wx.hideLoading()
          if(res.code==202){
            that.setData({
              showOneButtonDialog:true
            })
            return
          }
          wx.navigateTo({
            url: '/pages/sendOrder/sendOrder?orderId=' + code ,
          })
        })
      },
      complete: (res) => {
        // 获取物料 查询订单详情
        wx.showLoading({})
        that.setData({
          isDisabled: false
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
      orderlist
    } = this.data
    orderlist.forEach(item => {
      if( item.order_no == id){
    this.setData({
          sureId: id,
          // sureList: item.list
        })
      }
     
    })
    console.log(event)
  },
  // 工位选择
  onStationClick(event) {
    let {
      id
    } = event.currentTarget.dataset
    let {
      orderlist
    } = this.data
    orderlist.forEach(item => {
      if( item.order_no == id ){
   this.setData({
          sureId: id,
          // sureList: item.list
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '成品装柜',
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