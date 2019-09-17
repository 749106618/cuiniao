/**
 * request 请求
 */
let { config } = require('../config.js');


const request = {
    apiGet: (url, param = {}) => {
        return new Promise((resolve, reject) => {
            let token = wx.getStorageSync('token');
            wx.request({
                url: config.baseUrl + url + '?token=' + token,
                data: param,
                header: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: (res) => {
                    wx.hideLoading();
                    let status = res.data.status;
                    console.log(result);
                    if (status == 200) {
                        resolve(result)
                    }
                },
                fail: (res) => {
                    wx.hideLoading();
                    console.info(res)
                    wx.showModal({
                        title: '提示',
                        content: '系统异常，请联系管理员',
                        showCancel: false,
                    })
                }
            })
        })
    },
    apiPost: (url, param = {}) => {
        return new Promise((resolve, reject) => {
            wx.showLoading({
                title: '加载中...',
                mask: false
            })
            let token = wx.getStorageSync('token');
            wx.request({
                url: config.baseUrl + url + '?token=' + token,
                data: param,
                method: 'POST',
                header: {
                    "X-Requested-With": "XMLHttpRequest"
                },
                success: (res) => {
                    wx.hideLoading();
                    //console.log(res);
                    resolve(res)

                },
                fail: (res) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '系统异常，请联系管理员',
                        showCancel: false
                    })
                }
            })
        })
    }
}

/**
 * 设置storage
 */
const setStorage = ({ key, data }) => {
    return new Promise((resolve, reject) => {
        wx.setStorage({
            key,
            data,
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

/**
 * 获取storage
 */
const getStorage = (key) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key,
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

/**
 * 获取通知时间间隔
 */
const formatDateInterval = (oldTime) => {
    let _nowTime = new Date().getTime();
    let _oldTime = new Date(oldTime.replace(/-/g, "/")).getTime();
    let _formDate = Math.floor((_nowTime - _oldTime) / (1000 * 60));
    if (_formDate < 60) {
        return _formDate + '分钟前'
    } else if (_formDate < 1440) {
        return parseInt(_formDate / 60) + '小时前'
    } else if (_formDate < 2880) {
        return '昨天'
    } else {
        // 日期月份/天的显示，如果是1位数，则在前面加上'0'
        let getFormatDate = (arg) => {
            if (arg == undefined || arg == '') {
                return '';
            }
            var re = arg + '';
            if (re.length < 2) {
                re = '0' + re;
            }
            return re;
        }
        Date.prototype.toLocaleString = function () {
            return this.getFullYear() + "年" + getFormatDate(this.getMonth() + 1) + "月" + getFormatDate(this.getDate()) + "日 "// + this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
        };
        let _date = new Date(_oldTime);
        return _date.toLocaleString();
    }
}

module.exports = {
    request,
    setStorage,
    getStorage,
    formatDateInterval
}