Page({
  data: {

  },
  toUserInfo() {
    wx.navigateTo({
      url: '../userInfo/userInfo'
    })
  },
  onLoad: function () {
    // // 登陆
    // wx.login({
    //   success: function(res) {
    //     if (res.code) {
    //       console.log(`code码：${res.code}`)
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://www.mangoguang.cn/index.js',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  }
})
