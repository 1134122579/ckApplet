// pages/orderlist/index.js
import Api from "../../api/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storedata:null,//储存数据
    selectstationItem: {}, //工位对应的员工列表
    StationnameList: [], //选择的工位名列表
    sureStationArry: [], //选择的工位
    selectstation: [], //选择工位对应的人员
    selectstationItemName: null, //工位名字
    selectstationArray: [], // 工位 工人
    oneStation: {}, // 拿出一个工位列表
    radioList: [{
      value: 1,
      name: '否',
      checked: true,
    }, {
      value: 2,
      name: '是'
    }],
    orderDetail: {}, //订单详情
    oksetList: true,
    sureStation: {}, //工位选择   ok
    onpropbox: {
      order_no: '',
      name: '',
      yield: '',
      unit: '',
      staff_id: '',
      extra_yield:'',
      is_special: 1, //是否特殊处理
      price: ''
    }, //当前人员
    setDataList: [],
    sureArray: [],
    nameList: [],
    isnextManbutton: false,
    ispropListNumber: true, //员工产量
    showOneButtonDialog: false,
    is_poperList: true, //人选择
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
    sureStationId: null, //工位
    sureId: '',
    selectstationObjList: [], //工位  =>人员选择
    getData: {
      order_no: '',
      code: '',
      name: '',
      dec: '',
      yield: '',
      px: '',
      location: '',
      extra_yield: '', //额外加球数

    },
    orderlist: [], //订单列表
    StationList: [], //工位列表
    poperlist: [] //员工列表
  },
  // 单选 是否特殊处理
  radioChange(e) {
    let that = this
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const radioList = this.data.radioList
    let arr = radioList.forEach((item, index) => {
      console.log(item.value, e.detail.value)
      radioList[index].checked = item.value == e.detail.value
      if (item.value == e.detail.value) {
        that.setData({
          'onpropbox.is_special': e.detail.value
        })
      }
    })
    this.setData({
      radioList
    })
  },
  // 额外加球数

  bindaddnumInput(event) {
    let {
      value
    } = event.detail
    console.log('额外加球数', event, value.trim())
    this.setData({
      "onpropbox.extra_yield": value.trim()
    })
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
    this.getOrderInfo(sureId)

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
  // 获取 工位列表
  getStationList() {
    Api.getStationList().then(res => {
      this.setData({
        StationList: res
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
  bindKeyInput(event) {
    let {
      value
    } = event.detail
    console.log(event, value.trim())
    this.setData({
      "onpropbox.unit": value.trim()
    })
  },
  bindnumInput(event) {
    let {
      value
    } = event.detail
    console.log(event, value.trim())
    this.setData({
      "onpropbox.yield": value.trim()
    })
  },
  bindpriceInput(event) {
    let {
      value
    } = event.detail
    console.log(event, value.trim())
    this.setData({
      "onpropbox.price": value.trim()
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
    // if (!sureId) {
    //   this.setData({
    //     error: '请选择订单号'
    //   })
    //   return
    // }
    this.setData({
      isDisabled: true
    })
    wx.scanCode({
      fail: (res) => {
        that.setData({
          isDisabled: false
        })
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
        })
        // 判断是否含有 辅料编号
        if (false) {
          that.setData({
            showOneButtonDialog: true
          })
        } else {
          wx.navigateTo({
            url: '/pages/staff/staffpage' + sureId + '&itemNo=' + code,
          })
        }

        // if(getData.lists.in)
        // that.setData({
        //   isDisabled: false
        // })
      },
      complete: (res) => {

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
      if (item.order_no == id) {
        this.setData({
          sureId: id,
          // sureList: item.list
          'onpropbox.order_no': item.order_no
        })
      }

    })
    console.log(event)
  },

  // 查询订单详情
  getOrderInfo(order_no) {
    Api.getOrderInfo({
      order_no
    }).then(res => {
      console.log('订单数据',res)
      if(res.stations.length>0||!res.stations){

        this.setData({
          orderDetail: res,
          is_orderList: true,
          is_station: true,
          is_poperList:true,
          ispropListNumber:false,
          selectstationArray:res.stations,
          storedata:res.stations
        })
        this.onessetionObj()
        this.oneProp()
        return
      }
      this.setData({
        orderDetail: res,
        is_orderList: true,
        is_station: false
      })
    })
  },
  // 过滤掉已经填写的人

  // 工位选择选择
  onStationClick(event) {
    let {
      id,
      name
    } = event.currentTarget.dataset
    let {
      sureStationArry,
      StationnameList
    } = this.data
    if (sureStationArry.indexOf(id) != -1) {
      sureStationArry.splice(sureStationArry.indexOf(id), 1)
      StationnameList.splice(sureStationArry.indexOf(id), 1)
    } else {
      sureStationArry.push(id)
      StationnameList.push(name)
    }
    this.setData({
      sureStationArry,
      StationnameList
    })
  },
  //确认工位  数组
  nextTwoOut() {
    let {
      sureStationArry
    } = this.data
    if (sureStationArry.length <= 0) {
      this.setData({
        error: '请选择工位'
      })
      return
    }
    this.setData({
      is_station: true,
      is_poperList: false
    })
    this.onestation() //选择一个工位
  },

  //一个工位
  onestation() {
    let {
      StationnameList,
      sureStationArry
    } = this.data
    let staff_id = sureStationArry.splice(0, 1)
    let name = StationnameList.splice(0, 1)
    console.log(name, StationnameList)
    this.setData({
      selectstationItemName: name[0]
    })
  },
  // 人员选择
  onpropClick(event) {
    let {
      id,
      name
    } = event.currentTarget.dataset
    let {
      sureArray,
      nameList,
      selectstationObjList
    } = this.data
    if (sureArray.indexOf(id) != -1) {
      sureArray.splice(sureArray.indexOf(id), 1)
      nameList.splice(sureArray.indexOf(id), 1)
      selectstationObjList.splice(sureArray.indexOf(id), 1)
    } else {
      selectstationObjList.push({
        is_up:false,
        id,
        name
      })
      sureArray.push(id)
      nameList.push(name)
    }
    console.log('selectstationItem33333', selectstationObjList, sureArray)

    this.setData({
      selectstationObjList,
      sureArray,
      nameList
    })
  },
  // 确认工位   对应的员工列表
  suersetionPeople() {
    let {
      selectstationArray,
      selectstationItemName,
      selectstationObjList
    } = this.data
    let selectstationItem = {
      name: selectstationItemName,
      list: selectstationObjList,
    }  
    console.log('员工选择=======',selectstationItem)
      selectstationArray.push(selectstationItem)
    console.log(999999999999999, selectstationItem, selectstationArray)
    this.setData({
      selectstationArray
    })
  },
  // 人员选择后 下一步 、
  nextpropOut() {
    let {
      StationnameList,
      selectstationArray,
      sureArray
    } = this.data
    if (sureArray.length <= 0) {
      this.setData({
        error: '请选择员工'
      })
      return
    }
    this.suersetionPeople()
    if (StationnameList.length > 0) {
      this.onestation()
    } else {
            // 储存数据所有员工列表
      this.setData({
        storedata:JSON.parse(JSON.stringify(selectstationArray)),
        is_poperList: true,
        ispropListNumber: false
      })
      this.onessetionObj()  //选一个 工位
      this.oneProp() // 选中一个工人
    }
    this.setData({
      selectstationObjList:[],
      sureArray: [],
      nameList: [],
    })
  },

  // 选择工位列表
  onessetionObj() {
    let {
      selectstationArray
    } = this.data
    console.log('选择工位====',selectstationArray)
    if(selectstationArray.length<=0){
      return
    }
    let people = selectstationArray.splice(0, 1)
    this.setData({
      oneStation: people
    })
    console.log(222222, people)
  
  },
  // 获取当前一个人
  oneProp() {
    let {
      nameList,
      oneStation,
      
    } = this.data
    let that=this
    // 判断工位的人员选择完毕不
    console.log('33333333333333333333', oneStation)
    let obj = oneStation[0]
    if (obj.list.length <= 0) {
      this.onessetionObj() //
    }
    console.log('44444444444444444', obj.list)
    if (obj.list.length > 0) {
      let objitem = obj.list.splice(0, 1)[0]
      
      console.log( objitem)
      this.setData({
        'onpropbox.stations': that.filterok(obj.name,objitem.name),
        'onpropbox.station': obj.name,
        'onpropbox.name': objitem.name,
        'onpropbox.staff_id': objitem.id,
        'onpropbox.extra_yield': '',
        'onpropbox.yield': '',
        'onpropbox.price': '',
        isnextManbutton: false,
        nameList
      })
    }

  },
  filterok(stationname,name){
    let {storedata}=this.data
   storedata.forEach(item=>{
      if(item.name==stationname){
        item.list.forEach(obj=>{
          if(obj.name==name){
            obj.is_up==true
          }
        })
      }
    })
    console.log('自定义数组',storedata)
    return storedata;
  },
  // 下一个人
  nextMan() {
    let {
      nameList,
      onpropbox,
      setDataList,
      selectstationArray
    } = this.data
    let that=this
    console.log(nameList)
    if (!onpropbox.yield) {
      wx.showToast({
        title: '请填写数量',
      })
      return
    }
    // if (!onpropbox.unit) {
    //   wx.showToast({
    //     title: '请填写单位',
    //   })
    //   return
    // }
    if (onpropbox.is_special == 2) {
      if (!onpropbox.price) {
        wx.showToast({
          title: '请填写工价',
        })
        return
      }
      if (!onpropbox.extra_yield) {
        wx.showToast({
          title: '请填写额外加球数',
        })
        return
      }
    }
    // 所有人完成填写
    if (selectstationArray.length <= 0) {
      this.setData({
        ispropListNumber: true,
        oksetList: false
      })
      wx.showToast({
        title: '已完成填写',
      })
      return
    }
    this.setData({
      isnextManbutton: true
    })

    Api.staff_wages(onpropbox).then(res => {
      // setDataList.push(onpropbox)
      // that.setData({
      //   setDataList
      // })
      that.oneProp()
    }).catch(() => {
      this.setData({
        isnextManbutton: false
      })
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
      title: '人工登记',
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
    this.getstaff_list()
    this.getStationList()
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