let { request } = require('../../utils/api.js')
var app = getApp()
/* 
  登录流程：1.验证是否授权，如果直接走微信登录得到token并且验证，如果没授权进授权页面
  2.授权完成，走微信登录
  3.验证是否为商家，如果是商家，直接进首页，如果不是商家进登录页面绑定为商家然后进首页。

*/
Page({
  data: {
    statisticData: [],
    headImgUrl: wx.getStorageSync('headImgUrl'),
    nickName: wx.getStorageSync('nickName'),
    isxiaban: 1
  },
  onLoad() {
    this.wxLogin()
  },
  wxLogin() {
    wx.removeStorageSync("token")
    let self = this;
    wx.login({
      success: code => {
        console.log(code);
        let wxCode = {
          wxcode: code.code
        }
        wx.getSetting({
          success(res) {
            console.log(res);
            // 登录 已经授权，可以直接调用 getUserInfo 获取头像昵称
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: userInfoResult => {
                  // 可以将 res 发送给后台解码出 unionId
                  console.log(userInfoResult);
                  wxCode.nickName = userInfoResult.userInfo.nickName;
                  wxCode.gender = userInfoResult.userInfo.gender;
                  wxCode.headImgUrl = userInfoResult.userInfo.avatarUrl;
                  request.apiPost('/api/v1/user/wxlogin', wxCode).then(result => {
                    console.log("得到用户信息", result)
                    wx.setStorageSync("token", result.data.data)
                    self.checkUser()
                    self.getStatistic()
                  })
                }
              })
            } else {
              wx.navigateTo({
                url: '/pages/authorization/authorization'
              })
            }
          }
        })

      }
    })
  },
  checkUser() {
    request.apiPost('/api/v1/user/checkUser').then(res1 => {
      console.log(res1);
      wx.setStorageSync("headImgUrl", res1.data.data.headImgUrl)
      wx.setStorageSync("nickName", res1.data.data.nickName)
      if (res1 == 'unuser') {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }

    })
  },
  getStatistic() {
    let param = {
      type: 1
    }
    request.apiGet('/api/v1/app/merchant/homePage/get-merchant-statistic-today', param).then(res => {
      console.log(res);
      this.setData({
        statisticData: res.data.data
      })
    })
  },
  checkStatus(e) {
    console.log(e);
    let self = this;
    if (e.target.dataset.status == this.data.isxiaban) {
      return
    }
    if (e.target.dataset.status == 0) {
      wx.showModal({
        title: '提示',
        content: '确定要打烊吗？',
        showCancel: true,
        success(res) {
          if (res.confirm) {
            let param = {
              status: false
            }
            request.apiPost('/api/v1/app/merchant/homePage/set-merchant-status', param).then(res => {
              self.setData({
                isxiaban: e.target.dataset.status
              })
            })
          }
        }
      })
    }
    if (e.target.dataset.status == 1) {
      wx.showModal({
        title: '提示',
        content: '确定要营业吗？',
        showCancel: true,
        success(res) {
          if (res.confirm) {
            let param = {
              status: true
            }
            request.apiPost('/api/v1/app/merchant/homePage/set-merchant-status', param).then(res => {
              self.setData({
                isxiaban: e.target.dataset.status
              })
            })
          }
        }
      })
    }

  }
})