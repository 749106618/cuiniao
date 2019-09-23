let { request } = require('../../../utils/api.js')
var app = getApp()
Page({
  data: {
    stroeinfo: '',
    isSend: false
  },
  /**
 * 用户输入
 */
  inputHandler: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
    if (this.data.stroeinfo) {
      this.setData({
        isSend: true
      })
    } else {
      this.setData({
        isSend: false
      })
    }
  },
  submit() {
    //POST /api/v1/app/merchant/store/update-merhcant-shop-info
    let param = {
      shopInfo: this.data.stroeinfo
    }

    request.apiPost('/api/v1/app/merchant/store/get-merchant-base-info', param).then(res => {
      wx.showModal({
        title: '提示',
        content: '保存信息成功',
        showCancel: false
      })
    })

  }
})