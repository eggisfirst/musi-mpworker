//app.js
let mango = require('./utils/nameSpace')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 设置tabBar
    wx.setTabBarStyle({
      color: '#e6cdaf',
      backgroundColor: '#000000',
      borderStyle: 'white'
    })

    // 登录 /获取openid
    wx.login({
      success: res => {
        const code = res.code
        let timestamp = mango.getTimestamp()
        let arr= [
          ['jsCode',code],
          ['type','derucci'],
          ['secretKey', '477a1d7cc03d21d5abce55ec12170d33'],
          ['timestamp', timestamp]
        ]
        let sign = mango.getSign(arr)
        wx.request({
          url:'https://derucci.net/api/public/v1/sns/jscode2session',
          data:{
            jsCode:code,
            type:'derucci',
            timestamp,
            secretKey:'477a1d7cc03d21d5abce55ec12170d33',
            sign,
          },
          method: "GET",
          dataType: 'json',
          responseType: 'text',
          success:(res) => {
            const openid = res.data.openid
            wx.setStorage({
              key: 'openid',
              data: openid
            })
          }
        }) 
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})