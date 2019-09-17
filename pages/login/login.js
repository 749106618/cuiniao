let { request } = require('../../utils/api.js')
let { sendMobileCode, getQueryString } = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    mobile: '',
    pwd: '',
    isSend: false
  },
  onLoad() {
    /* 
    <image wx:if="{{mobile}}" src="../../icon/chacha.png" bindtap="delMoblie" />
    <image wx:if="{{pwd}}" src="../../icon/chacha.png" bindtap="delPwd" />
    */
  },
  /**
   * 用户输入
   */
  inputHandler: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
    if (this.data.mobile && this.data.pwd) {
      this.setData({
        isSend: true
      })
    } else {
      this.setData({
        isSend: false
      })
    }
  },
  delMoblie() {
    this.setData({
      mobile: ''
    })
  },
  delPwd() {
    this.setData({
      passcode: ''
    })
  },
  send() {
    let param = {
      mobile:this.data.mobile,
      pwd:this.data.pwd
    }
    request.apiPost('/api/v1/user/checkpwdLogin',param).then(res=>{
      console.log(res);  
    })
  }
})