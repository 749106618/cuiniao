// pages/extension/add_message.js
let { request } = require('../../utils/api.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityIds: 0,
    id: 0,
    subject: "",
    suitUser: 0,
    templateId: 0,
    totalamount: 0,
    totalquantity: 0,
    templateData: '',
    array: ['常驻用户', '周边用户'],
    communitys: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      templateData: options.param,
      templateId: options.templateId
    })
  },
  submit() {
    let param = {
      communityIds: this.data.communityIds,
      id: this.data.id,
      subject: this.data.subject,
      suitUser: this.data.suitUser,
      templateData: this.data.templateData,
      templateId: +this.data.templateId,
      totalAmount: +this.data.totalamount,
      totalQuantity: +this.data.totalquantity
    }
    // for (var key in param) {
    //   console.log(param[key]);
    //   if (!param[key]) {
    //     wx.showToast({
    //       title: '请填写完所有信息',
    //       icon: 'none'
    //     });
    //     return;
    //   }
    // }
    request.apiPost('/api/v1/app/merchant/redpackThrow/submit-redpack-data', param).then(res => {
      console.log(res);

    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.array[e.detail.value] == '常驻用户') {
      this.setData({
        suitUser: 1
      })
    }
    if (this.data.array[e.detail.value] == '周边用户') {
      this.setData({
        suitUser: 2
      })
    }
    this.setData({
      index: e.detail.value
    })
  },
  /**
  * 用户输入
  */
  inputHandler: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
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
    if (wx.getStorageSync("communityIds")) {
      let empty = []
      wx.getStorageSync("communityIds").forEach((v, i) => {
        empty[i] = +v.id
      });
      this.setData({
        communitys: wx.getStorageSync("communityIds"),
        communityIds: empty
      })
      wx.removeStorageSync("communityIds")
    }
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