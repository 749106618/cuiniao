// pages/extension/extension_template.js
let { request } = require('../../utils/api.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [],
    content0: '',
    content1: '',
    content2: '',
    content3: '',
    content4: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  next() {
    wx.showModal({
      title: '系统提示',
      content: '确定已编辑完成？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          let param = {
            content0: this.data.content0,
            content1: this.data.content1,
            content2: this.data.content2,
            content3: this.data.content3,
            content4: this.data.content4
          }
          param = JSON.stringify(param)
          console.log(param);
          wx.navigateTo({
            url: 'add_message?param=' + param + "&templateId=2"
          });
        }
      }
    });
  },
  save() {


  },
  /**
 * 用户输入
 */
  inputHandler: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
  },
  chooseWxImage() {
    let self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'], /*'album', 'camera'*/
      success: function (res) {
        console.log(res);
      }
    })
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