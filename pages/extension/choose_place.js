let { request } = require('../../utils/api.js')
Page({
  //全选
  selecAll: function () {
    var convArr = this.data.convArr
    if (this.data.isSelecAll == false) {
      for (var i = 0; i < convArr.length; i++) {
        convArr[i].isclick = true
      }
      this.setData({
        convArr: convArr,
        isSelecAll: true,
        check: "../../images/check.png",
        openAll: false,
      })
    } else {
      for (var i = 0; i < convArr.length; i++) {
        convArr[i].isclick = false
      }
      this.setData({
        convArr: convArr,
        isSelecAll: false,
        check: "../../images/uncheck.png",
        openAll: false
      })
    }
  },
  //点击
  chooseIt: function (res) {
    var idx = res.currentTarget.dataset.idx
    var convArr = this.data.convArr
    var times = 0
    for (var i = 0; i < convArr.length; i++) {
      if (i == idx) {
        if (convArr[i].isclick != true) {
          convArr[i].isclick = true
        } else {
          convArr[i].isclick = false
        }
      }
    }
    this.setData({
      convArr: convArr,
      openAll: false
    })
    for (var j = 0; j < convArr.length; j++) {
      if (convArr[j].isclick == true) {
        times++
      }
    }
    if (times == 0) {
      this.setData({
        isSelecAll: false
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    isSelecAll: false,
    check: "../../images/uncheck.png",
    convArr: [{
      name: "愿景山水湾",
    },
    {
      name: "愿景山水湾",
    },
    {
      name: "愿景山水湾",
    },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    request.apiGet('/api/v1/app/merchant/get-service-community').then(res => {
      self.setData({
        convArr: res.data.data
      })

    })
  },
  submit() {
    let empty = []
    this.data.convArr.forEach((v, i) => {
      if (v.isclick) {
        empty[i] = v
      }
    });
    if (empty.length > 0) {
      wx.setStorageSync("communityIds", empty)
      wx.navigateBack({
        delta: 1
      });

    } else {
      wx.showToast({
        title: '请选择投放小区',
        icon: 'none',
      });
    }
  }
})