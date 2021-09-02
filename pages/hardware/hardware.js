// pages/hardware/staple.js
import Api from '../../api/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oksetList: true,
        isNumber: false,
        isDisabled: false,
        is_homeButton: false,
        value: '',
        stapleList: [],
        supplierList: [{
            id: 1,
            name: '金鑫'
        }],
        getData: {
            material_id: '',
            supplier: '',
            name: '',
            // staple: '',
            unit: 'kg',
            num: ''
        },
        listQuery: {
            page: 1,
            pageSize: 10
        },
        is_picker: false, //

    },
    // 获取原料列表
    materialList() {
        let that = this
        Api.materialList().then(res => {
            console.log(res)
            that.setData({
                stapleList: res
            })
        })
    },
    bindKeyInput(event) {
        let {
            value
        } = event.detail
        console.log(event, value.trim())
        this.setData({
            "getData.supplier": value.trim()
        })
    },

    staplebindchange(e) {
        let {
            value
        } = e.detail
        let {
            stapleList
        } = this.data
        console.log(9999999999999, stapleList[value], stapleList[value].name)
        this.setData({
            'getData.material_id': stapleList[value].id,
            "getData.name": stapleList[value].name,
            "getData.unit": stapleList[value].unit
        })
        console.log(e)
    },
    ShopNamebindchange(e) {
        let {
            value
        } = e.detail
        let {
            supplierList
        } = this.data
        this.setData({
            "getData.supplier": supplierList[value].name
        })
    },
    nullPuop(text) {
        wx.showToast({
            title: text,
            icon: 'error'
        })
    },
    // 下一步
    next() {
        let {
            getData,
            isNumber
        } = this.data
        if (!isNumber) {
            if (!getData.name) {
                this.nullPuop('请填写五金名称')
                return
            }
            if (!getData.supplier) {
                this.nullPuop('请填写供应商')
                return
            }
            this.setData({
                is_picker: true,
                isNumber: true,
            })
        } else {
            if (!getData.num) {
                this.nullPuop('请输入数量')
                return
            }
            this.setData({
                isDisabled: true,
            })
            wx.showLoading({
                title: '提交中',
            })
            Api.hardwareSave(getData).then(res => {
                wx.hideLoading()
                this.setData({
                    isDisabled: false,
                    isNumber: false,
                    oksetList: false
                })
            }).catch(e => {
                this.setData({
                    isDisabled: false,
                })
                wx.showToast({
                    title: '重新提交',
                })
            })

        }

    },
    // 选择原料
    bindyuanInput(event) {
        let {
            value
        } = event.detail
        console.log(event, value.trim())
        this.setData({
            "getData.name": value.trim()
        })
    },
    // 选择供应商
    bindshopInput(event) {
        let {
            value
        } = event.detail
        console.log(event, value.trim())
        this.setData({
            "getData.supplier": value.trim()
        })
    },
    // s数量
    bindnumInput(event) {
        let {
            value
        } = event.detail
        console.log(event, value.trim())
        this.setData({
            "getData.num": value.trim()
        })
    },
    // 完后
    ok() {
        wx.switchTab({
            url: '/pages/home/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '五金入库'
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
        this.materialList()
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