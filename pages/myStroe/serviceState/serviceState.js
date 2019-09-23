var app = getApp()
Page({
  data: {
    serviceCommunitys: []//还没有会员数字段
  },
  onLoad() {
    this.setData({
      serviceCommunitys: wx.getStorageSync("storeData").serviceCommunitys
    })
  }
})