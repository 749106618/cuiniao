Page({
  data: {
    noDiscountGoods: ''
  },
  onLoad(options) {
    this.setData({
      noDiscountGoods: options.cdy
    })
  }
})