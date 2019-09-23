let { request } = require('../../../utils/api.js')
var app = getApp()
Page({
  data: {
    storeData: [],
    Communitys: [],//开通服务小区
    CommunitysLength: '',
    merchantLabels: [],//店铺标签
    merchantLabelsLength: '',
    merchantType: ''//店铺类型
  },
  onLoad() {
    let self = this;
    request.apiGet('/api/v1/app/merchant/store/get-merchant-base-info').then(res => {
      wx.setStorageSync("storeData", res.data.data)
      //0：超市便利；1：水果蔬菜；2：建材五金
      let merchantType = ''

      if (res.data.data.merchantType == 0) {
        merchantType = '超市便利'
      } else if (res.data.data.merchantType == 1) {
        merchantType = '水果蔬菜'
      } else {
        merchantType = '建材五金'
      }

      let empty = []
      let empty1 = []
      res.data.data.serviceCommunitys.forEach((v, i) => {
        empty[i] = v.communityName
      });
      res.data.data.merchantLabels.forEach((v, i) => {
        empty1[i] = v.merchantLabels
      });
      let serviceCommunitys = empty.join('、')
      let merchantLabels = empty1.join('、')
      self.setData({
        storeData: res.data.data,
        Communitys: serviceCommunitys,
        merchantLabels: merchantLabels,
        CommunitysLength: empty.length,
        merchantLabelsLength: empty1.length,
        merchantType: merchantType
      })

    })
  },
  previewImage(e) {
    console.log(e);
    let empty = [];
    e.target.dataset.photos.forEach((v, i) => {
      empty[i] = v.url
    })
    wx.previewImage({
      current: e.target.dataset.current, // 当前显示图片的http链接
      urls: empty // 需要预览的图片http链接列表
    })
  }
})