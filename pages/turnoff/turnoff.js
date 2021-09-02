// pages/accessories/index.js  
import Api from "../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
   
        maskclosable: false,
        dialogShow: false,
        getShop:null,//所有参数
        dialogbuttons: [{
            text: '取消'
        }, {
            text: '继续'
        }],
        isDisabled: false,
        iscodeButton: false, //是否显扫码按钮
        is_homeButton: false,
        listPx: [{
            id: 1,
            name: "个"
        }, {
            id: 2,
            name: "件"
        }],
        value: 0,
        getData: {
            order_no: '',
            name: '',
            dec: '',
            num: '',
            px: '',
            warehouse_no: ''
        },
        isNumber: false //  fale 下一步
    },
    // // 订单不存在
    // tapDialogButton(e) {
    //     this.setData({
    //         showOneButtonDialog: false
    //     })
    // },
    // 弹窗  按钮
    tapDialogButton(e) {
        console.log(e)
        let {
            index
        } = e.detail
        if (index == 1) {
            this.setData({
                dialogShow: false,
                isNumber: true
            })
        } else {
            this.setData({
                dialogShow: false,
                isNumber: false
            })
            // wx.switchTab({
            //     url: '/pages/home/index',
            // })
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
            "getData.px": value.trim()
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
        let {
            isNumber,
            getData,
            getShop
        } = this.data
        // 选择数量
        if (!isNumber) {
            console.log(getData,!getData.num,getData.num.trim() == '' ,!getData.px )
            if (!getData.num || getData.num.trim() == '' || !getData.px || getData.px.trim() == '') {
                wx.showToast({
                    title: '请输入数量',
                    icon: "error",
                    duration: 2000,
                })
                return
            }
            if (!Number.isFinite(Number(getData.num)) && !Number.isFinite(Number(getData.px))) {
                wx.showToast({
                    title: '请输入数字',
                    icon: "error",
                    duration: 2000,
                })
                return
            }
            // 验证需要的数量 ==================================================
            if (getData.num * getData.px > getShop.box) {
                this.setData({
                    dialogShow: true
                })
                return
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
                let {
                    order_no,
                    name,
                    warehouse_no,
                    dec,
                    num,
                    px
                } = getData
                let upData = {
                    order_no,
                    name,
                    warehouse_no,
                    size: dec,
                    // save_box: Number(num) * Number(px)
                    box:num,
                    tray:px
                }
                console.log(upData)
                Api.saveOrder(upData).then(res => {
                    wx.hideLoading()
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
                    "getData.order_no": res.result,
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
            "getData.px": listPx[val].name
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let {orderId}=options
        console.log(options)
   
         // 获取订单信息  校验有订单
         wx.showLoading({
           title: '加载中',
         })
    Api.getOrderInfo({
        order_no: orderId
      }).then(res => {
        console.log('校验订单信息===', res)
        let {order_no,name,size}=res
        this.setData({
            getShop:res,
            "getData.order_no":order_no,
            "getData.name":name,
            "getData.dec":size,
         })
        wx.hideLoading()
      })
        wx.setNavigationBarTitle({
            title: '成品入库'
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