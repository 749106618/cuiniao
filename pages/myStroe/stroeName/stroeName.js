var app = getApp()
Page({
  data: {
    storeinfo: '',
    dataType: ''
  },
  onLoad(options) {
    let dataType = options.dataType
    this.setData({
      dataType: dataType
    })
    if (dataType == '店铺名称') {
      this.setData({
        storeinfo: wx.getStorageSync("storeData").merchantName
      })
    } else if (dataType == '店铺类型') {
      let merchantType = ''
      if (wx.getStorageSync("storeData").merchantType == 0) {
        merchantType = '超市便利'
      } else if (wx.getStorageSync("storeData").merchantType == 1) {
        merchantType = '水果蔬菜'
      } else {
        merchantType = '建材五金'
      }
      this.setData({
        storeinfo: merchantType
      })
    } else if (dataType == '经营商品') {
      this.setData({
        storeinfo: wx.getStorageSync("storeData").operateGoods
      })
    } else {
      this.setData({
        storeinfo: wx.getStorageSync("storeData").address
      })
    }

  }
})