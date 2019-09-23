let { request } = require('../../../utils/api.js')
Page({
  data: {
    storeData: []
  },
  onLoad() {
    request.apiGet('/api/v1/app/merchant/store/get-merchant-base-info').then(res => {
      this.storeData({
        storeData: res.data
      })
    })
  }
})