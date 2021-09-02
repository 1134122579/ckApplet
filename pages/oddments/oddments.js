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
            code: '',
            name: '',
            dec: '',
            num: '',
            unit: '',
            location: ''
        },
        isNumber: false //  fale 下一步
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
    // 库存位
    dressbindinput(event) {
        let {
            value
        } = event.detail
        console.log(event, value.trim())
        this.setData({
            "getData.location": value.trim()
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
            if (!getData.num || getData.num.trim() == '') {
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
            if (getData.location) {
                console.log(getData.location.split(','))
                wx.showLoading({
                    title: '提交中..',
                })
                this.setData({
                    isDisabled: true
                })
                let {
                    order_no,
                    code,
                    name,
                    dec,
                    num,
                    unit,
                    location
                } = getData
                let upData = {
                    order_no,
                    bar_code: code,
                    num,
                    name,
                    dec,
                    unit: unit,
                    warehouse_no: location
                }
                Api.surplusSave(upData).then(res => {
                    wx.hideLoading()
                    this.setData({
                        isDisabled: true,
                        is_homeButton: true
                    })
                    wx.showToast({
                        title: '提交成功',
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
                    "getData.code": res.result,
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
    onLoad: function(options) {
        let that=this
        let {
            orderId,
            itemNo
        } = options 
        console.log(options)
    
        Api.fuliaoinfo({
            bar_code:itemNo,
            order_no:orderId
        }).then(res=>{
            that.setData({
                getData:res
            })
            that.setData({
                "getData.num": null,
                "getData.order_no": orderId,
                "getData.code": itemNo,
                iscodeButton: false,
            })
        })
        wx.setNavigationBarTitle({
            title: '余料入库'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})