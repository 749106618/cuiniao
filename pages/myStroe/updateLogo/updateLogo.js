var app = getApp()
Page({
  data: {
    merchantLogo: []//还没有会员数字段
  },
  onLoad() {
    this.setData({
      merchantLogo: wx.getStorageSync("storeData").merchantLogo
    })
  }
})