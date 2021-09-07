// pages/accessories/index.js  
import Api from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_pass: true, //是否判断超量
    ckNum: null, //库存
    warehouse_nodisabled: true,
    maskclosable: false,
    showOneButtonDialog: false,
    dialogbuttons: [{
      text: '取消'
    }, {
      text: '继续'
    }],
    isDisabled: false,
    iscodeButton: false, //是否显示扫码
    is_homeButton: false,
    listPx: [{
      id: 1,
      name: "个"
    }, {
      id: 2,
      name: "件"
    }, {
      id: 2,
      name: "kg"
    }],
    value: 0,
    getData: {
      order_no: '',
      orderId: '',
      bar_code: '',
      name: '',
      dec: '',
      num: '',
      unit: '个',
      warehouse_no: ''
    },
    isNumber: false //  fale 下一步
  },
  // 弹窗  按钮
  tapDialogButton(e) {
    console.log(e)
    let {
      index
    } = e.detail
    if (index == 1) {
      this.setData({
        showOneButtonDialog: false,
        isNumber: true
      })
    } else {
      wx.redirectTo({
        url: '/pages/home/index',
      })
    }

  },
  // 完成到首页
  homeButton() {
    wx.switchTab({
      url: '/pages/home/index',
    })
  },
  // s数量
  bindKeyInput(event) {
    let {
      value
    } = event.detail
    console.log(event, value.trim())
    this.setData({
      "getData.num": value.trim()
    })
  },
  // s数量
  bindPxInput(event) {
    let {
      value
    } = event.detail
    console.log(event, value.trim())
    this.setData({
      "getData.unit": value.trim()
    })
  },
  // 库存位
  dressbindinput(event) {
    let {
      value
    } = event.detail
    console.log(event, value.trim())
    this.setData({
      "getData.warehouse_no": value.trim()
    })
  },

  // 下一个
  next() {
    let that = this
    let {
      isNumber,
      getData,
      ckNum,
      is_pass
    } = this.data
    // 选择数量
    if (!isNumber) {
      if (!getData.num && getData.num.trim() == '') {
        wx.showToast({
          title: '请输入数量',
          icon: "error",
          duration: 2000,
        })
        return
      }
      if (!Number.isFinite(Number(getData.num)) && !Number.isFinite(Number(getData.unit))) {
        wx.showToast({
          title: '请输入数字',
          icon: "error",
          duration: 2000,
        })
        return
      }
      // 验证需要的数量 
      // 是否判断超量
      if (is_pass) {
        if (getData.num > ckNum) {
          this.setData({
            showOneButtonDialog: true
          })
          return
        }
      }

      this.setData({
        isNumber: true
      })
    } else {
      // 确定提交
      if (getData.warehouse_no) {
        console.log(getData.warehouse_no.split(','))
        wx.showLoading({
          title: '提交中..',
        })
        this.setData({
          isDisabled: true
        })
        Api.fuliaoOut(getData).then(res => {
          wx.hideLoading()
          if (res.code == 202) {
            console.log(res)
            wx.showToast({
              title: res.message,
              mask: true,
              duration: 2000
            })
            that.setData({
              isDisabled: false
            })
            return
          }
          this.setData({
            isDisabled: true,
            is_homeButton: true
          })
          wx.showToast({
            title: '提交成功',
          })
        }).catch((e) => {
          console.log(e)
          wx.showToast({
            title: '请重新提交',
          })
          this.setData({
            isDisabled: false,
          })
        })
      } else {
        wx.showToast({
          title: '请输入库存位',
          icon: "error",
          duration: 2000,
        })
      }

    }
  },
  // 扫码
  scanCode() {
    let {
      getData
    } = this.data
    let that = this
    wx.scanCode({
      success(res) {
        console.log(res)
        that.setData({
          "getData.bar_code": res.result,
          iscodeButton: false
        })

      }
    })
  },
  // 选择单位
  bindChange(e) {
    const val = e.detail.value
    let {
      listPx
    } = this.data
    this.setData({
      "getData.unit": listPx[val].name
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      orderId,
      itemNo
    } = options
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    Api.fuliaoinfo({
      bar_code: itemNo,
      order_no: orderId,
      type: 1
    }).then(res => {
      wx.hideLoading({})
      let {
        name,
        size,
        unit,
        num,
        warehouse_no
      } = res
      this.setData({
        "getData.order_no": orderId,
        "getData.bar_code": itemNo,
        "getData.name": name,
        "getData.unit": unit,
        "getData.warehouse_no": warehouse_no,
        ckNum: num
        // "getData.dec": size || '未知',
      })
    })
    wx.setNavigationBarTitle({
      title: '辅料出库'
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