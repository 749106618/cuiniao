// pages/extension/template_detail.js
let { request } = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityDetail: {},
    memberGetList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = {
      id: options.id
    }
    request.apiGet('/api/v1/app/merchant/redpackThrow/get-activty-detail', param).then(res => {
      this.setData({
        activityDetail: res.data.data
      })
    })
    let param1 = {
      id: options.id,
      pageNum: 1,
      pageSize: 10
    }
    request.apiGet('/api/v1/app/merchant/redpackThrow/get-member-receive-list', param1).then(res => {
      this.setData({
        memberGetList: res.data.data.data
      })
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