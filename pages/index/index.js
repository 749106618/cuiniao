Page({
    onLoad(){
        let token = wx.getStorageSync(token);
        if (token) {
        return;
        } else {
        wx.reLaunch({
            url: '/pages/login/login'
        })
        }
    }
})