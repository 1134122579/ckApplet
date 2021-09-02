// pages/accessories/index.js  
import Api from "../../api/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isDisabled: false,
        iscodeButton: true,
        is_homeButton: false,
        is_barCodeToast: false,
        oneButton: [{
            text: '确定'
        }],
        listPx: [{
            id: 1,
            name: "个"
        }, {
            id: 2,
            name: "件"
        }],
        value: 0,
        getData: {
            bar_code: "",
            name: '',
            dec: '',
            num: '',
            unit: '',
            warehouse_no: ''
        },
        isNumber: false //  fale 下一步
    },
    tapDialogButton() {
        this.setData({
            is_barCodeToast: false
        })
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
    // 单位
    bindunit(event) {
        let {
            value
        } = event.detail
        console.log(event, value.trim())
        this.setData({
            "getData.unit": value
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
            getData
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
            if (!Number.isFinite(Number(getData.num))) {
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
            // 确定提交
            if (getData.warehouse_no) {
                console.log(getData.warehouse_no.split(','))
                wx.showLoading({
                    title: '提交中..',
                })
                this.setData({
                    isDisabled: true
                })
                Api.fuliaoSave(getData).then(res => {
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
        console.log('扫码')
        let {
            getData
        } = this.data
        let that = this
        wx.scanCode({
            onlyFromCamera: true,
            success(data) {
                console.log(data)
                Api.fuliaoinfo({
                    bar_code: data.result,
                    type: 1
                }).then(res => {
                    console.log(res)
                    if (res.code == 202) {
                        that.setData({
                            is_barCodeToast: true
                        })
                        return
                    }
                    that.setData({
                        getData: res,
                        // "getData.name": res.name,
                        // "getData.bar_code": data.result,
                        "getData.size": res.size ? res.size : '未知',
                        iscodeButton: false
                    })
                })
            },
            complete(res) {
                console.log(res)
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
        wx.setNavigationBarTitle({
            title: '辅料入库'
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