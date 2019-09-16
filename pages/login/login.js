let { request } = require('../../utils/api.js')
let { sendMobileCode, getQueryString } = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    account: '',
    passcode: ''
  },
  onLoad() {
  },
  /**
   * 用户输入
   */
  inputHandler: function (e) {
    let temp = {}
    console.log(e.detail.value);
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
  },
  bindGetUserInfo(e) {
    //showLoading('登录中...');
    console.log(e.detail.userInfo)
    if (!e.detail.userInfo) {
      return;
    }
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
                  wxCode.gender  = userInfoResult.userInfo.gender;
                  wxCode.headImgUrl = userInfoResult.userInfo.avatarUrl;
                  request.apiPost('/api/v1/user/wxlogin', wxCode).then(result => {
                    console.log("得到用户信息", result)
                    sessionKey = result.data.sessionKey
                  })
                }
              })
            }
          }
        })

      }
    })
  }
})