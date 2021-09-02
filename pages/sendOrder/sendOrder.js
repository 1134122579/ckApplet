// pages/accessories/index.js  
import Api from "../../api/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_force: false, //是否去强制出库
        getShop: null,
        maskclosablsaveOrdere: false,
        dialogShow: false,
        dialogbuttons: [{
            text: '取消'
        }, {
            text: '继续'
        }],
        isDisabled: false,
        reduceDisbled: false,
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
            num: 0,
            px: 0,
            warehouse_no: '',
            properName: '',
            remark: '',
            remainder: '',
        },
        isNumber: false //  fale 下一步
    },
    // 减少- - - - - -
    Num_reduceButton(event) {
        let {
            num
        } = event.currentTarget.dataset
        console.log('减少', event, num - 1)

        if (num <= 0) {
            wx.showToast({
                title: '最少不能为0',
            })
            return
        }
        this.setData({
            "getData.num": Number(num) - 1
        })
    },
    // 增加 ++++++
    Num_addButton(event) {
        let {
            num
        } = event.currentTarget.dataset
        console.log('加', num, num + 1)

        this.setData({
            "getData.num": Number(num) + 1
        })

    },
    // 减少- - - - - -
    Px_reduceButton(event) {
        let {
            num
        } = event.currentTarget.dataset
        console.log('减少', event, num - 1)

        if (num <= 0) {
            wx.showToast({
                title: '最少不能为0',
            })
            return
        }
        this.setData({
            "getData.px": Number(num) - 1
        })
    },
    // 增加 ++++++
    Px_addButton(event) {
        let {
            num
        } = event.currentTarget.dataset
        console.log('加', num, num + 1)
        this.setData({
            "getData.px": Number(num) + 1
        })
    },
    // 弹窗  按钮
    tapDialogButton(e) {
        console.log(e)
        let {
            index
        } = e.detail
        if (index == 1) {
            this.setData({
                is_force: true,
                dialogShow: false,
                isNumber: true
            })
        } else {
            this.setData({
                is_force: false,
                dialogShow: false,
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
            "getData.properName": value.trim()
        })
    },
    remarkinput(event) {
        let {
            value
        } = event.detail
        console.log(event, value.trim())
        this.setData({
            "getData.remark": value.trim()
        })
    },
    remainderinput(event) {
        let {
            value
        } = event.detail
        console.log(event, value.trim())
        this.setData({
            "getData.remainder": value.trim()
        })
    },

    // 下一个
    next() {
        let {
            isNumber,
            getData,
            getShop,
            is_force
        } = this.data
        // 选择数量
        if (!isNumber) {

            if (Number(getData.num) <= 0 || Number(getData.px) <= 0) {
                wx.showToast({
                    title: '不能小等于 0',
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

            this.setData({
                isNumber: true
            })
        } else {
            // 验证需要的数量 ==================================================
            if(!is_force){
                if (getData.num * getData.px + Number(getData.remainder) > getShop.box) {
                    this.setData({
                        dialogShow: true
                    })
                }
                return
            }
            // 确定提交
            console.log(getData)
            if (getData.remainder) {
                console.log(getData.warehouse_no.split(','))
                wx.showLoading({
                    title: '提交中..',
                })
                this.setData({
                    isDisabled: true
                })
                let {
                    properName,
                    order_no,
                    name,
                    warehouse_no,
                    dec,
                    num,
                    px,
                    remark,
                    remainder
                } = getData
                let upData = {
                    remainder,
                    properName,
                    order_no,
                    name,
                    warehouse_no,
                    size: dec,
                    save_box: Number(num) * Number(px),
                    box: num,
                    tray: px,
                    remark
                }
                console.log(upData)
                Api.sendOrder(upData).then(res => {
                    wx.hideLoading()
                    console.log(res)
                    if (res.data.code == 202) {
                        wx.showToast({
                            title: res.message,
                            mask: true,
                            duration: 2000
                        })
                        this.setData({
                            isDisabled: false,
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
                    wx.showToast({
                        title: '请重新提交',
                        mask: true,
                        duration: 2000
                    })
                    this.setData({
                        isDisabled: false,
                    })
                })
            } else {
                wx.showToast({
                    title: '余数大等于0',
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
        let {
            orderId
        } = options
        console.log(options)

        // 获取订单信息  校验有订单
        wx.showLoading({
            title: '加载中',
        })
        Api.getOrderInfo({
            order_no: orderId
        }).then(res => {
            console.log('校验订单信息===', res)
            let {
                order_no,
                name,
                size
            } = res
            this.setData({
                getShop: res,
                "getData.order_no": order_no,
                "getData.name": name,
                "getData.dec": size,
            })
            wx.hideLoading()
        })
        wx.setNavigationBarTitle({
            title: '成品出库'
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