let mango = require('../../utils/nameSpace.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    account: '',
    passWord: ''
  },
  onLoad: function () {
    this.getAccountMsg()
    // 设置tabBar
    setTabBar()
    // 登陆
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(`code码：${res.code}`)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // 登陆
  login: function(e) {
    wx.showLoading()
    let res = e.detail.value
    // 将账号信息缓存到本地。
    let accountMsg = {"account": res.account, "passWord": res.passWord}
    wx.setStorage({
      key: "accountMsg",
      data: accountMsg
    })
    wx.request({
      url: `${mango.port}app/login.api`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        account: res.account,  // 账号
        password: res.passWord, // 密码
      },
      success: (res) => {
        res = res.data
        if (res) {
          wx.hideLoading()
          wx.navigateTo({
            url: `../../pages/verifyChange/verifyChange?account=${accountMsg.account}&name=${res.name}`
          })
          // 只允许从相机扫码
          // wx.scanCode({
          //   onlyFromCamera: true,
          //   success: (res) => {
          //     // 将数据存储到本地
          //     wx.setStorage({
          //       key: "cardNum",
          //       data: res.result
          //     })
          //     wx.navigateTo({
          //       url: '../../pages/verify/verify'
          //     })
          //   }
          // })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '登陆失败！',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getAccountMsg() {
    let _this = this
    wx.getStorage({
      key: 'accountMsg',
      success: (res) => {
        res = res.data
        _this.setData({
          account: res.account,
          passWord: res.passWord
        })
      },
      fail: (res) => {
          console.log('获取账号信息失败：')
      }
    })
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

