let { request } = require('../../../utils/api.js')
Page({
  data: {
    switch: 0,
    monthNum: 0,
    weekNum: 0,
    totalNum: 0,
    noDiscountGoods: ''
  },
  chage(e) {
    this.setData({
      switch: e.currentTarget.id
    })
  },
  onLoad() {
    this.loadMemberInfo()
    this.loadConfigure()
  },
  loadMemberInfo() {
    request.apiGet('/api/v1/app/merchant/memberManage/get-merchant-member-info').then(res => {
      this.setData({
        monthNum: res.data.data.monthNum,
        totalNum: res.data.data.totalNum,
        weekNum: res.data.data.weekNum
      })
    })
  },
  loadConfigure() {
    request.apiGet('/api/v1/app/merchant/get-merchant-configure').then(res => {
      this.setData({
        noDiscountGoods: res.data.data.noDiscountGoods
      })
    })
  }
})