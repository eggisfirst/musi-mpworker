//index.js
//获取应用实例
const app = getApp()
// const imgs = require('../../images/bgImg.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    account: '',
    passWord: ''
  },
  // 提交表单
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  // 扫码
  start: function() {
    console.log(123)
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success: (res) => {
    //     console.log('扫码成功：' + res)
    //   }
    // })
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    // 设置tabBar
    setTabBar()
    // 登陆
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(`code码：${res.code}`)
          //发起网络请求
          wx.request({
            url: 'https://derucci.net/api/public/v1/sendsns',
            data: {
              phone: '18824864356'
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(`用户信息：${e}`)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changePassWord: function(e, passWord) {
    console.log(passWord)
    this.setData({
      passWord: e.detail.value
    })
  },
  login: function() {
    console.log(this.data.passWord)
  }
})

function setTabBar() {
  wx.setTabBarStyle({
    color: '#666666',
    selectedColor: '#000000',
    backgroundColor: '#fafafa',
    borderStyle: 'white'
  })
  wx.setTabBarItem({
    index: 0,
    text: '机场VIP',
    iconPath: '/path/to/../../../icon/home.png',
    selectedIconPath: '/path/to/../../icon/home_press.png'
  })
  wx.setTabBarItem({
    index: 1,
    text: '618',
    iconPath: '/path/to/../../../icon/sort.png',
    selectedIconPath: '/path/to/../../icon/sort_press.png'
  })
}
