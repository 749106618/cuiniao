//app.js
App({
  onLaunch: function () {
    let token = wx.getStorageSync(token);
    if (token) {
      wx.navigateTo({
        url: '/pages/index/index'
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  globalData: {

  },
  onShow() {
    
  }
})