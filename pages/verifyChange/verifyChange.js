Page({
  data: {
    name: 'guang',
    account: '11608050',
    alertShow: 'hide',
    cardInputShow: 'hide'
  },
  toUserInfo() {
    wx.navigateTo({
      url: '../userInfo/userInfo'
    })
  },
  onLoad: function (option) {
    if (option.name && option.account) {
      this.setData({
        name: option.name,
        account: option.account
      })
    }
  },

  // 调用微信扫一扫
  scan() {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.navigateTo({
          url: `../../pages/verify/verify?cardNum=${res.result}&account=${this.data.account}`
        })
      }
    })
  },
  goVerify() {
    const carNum = this.data.carNum
    if (carNum) {
      this.setData({
        cardInputShow: 'hide'
      })
      wx.navigateTo({
        url: `../../pages/verify/verify?cardNum=${carNum}&account=${this.data.account}`
      })
    } else {
      wx.showToast({
        title: '请填写卡号',
        duration: 2000
      })
    }
  },
  changeVal(e) {
    this.setData({
      carNum: e.detail.value
    })
  },
  showAlert() {
    // wx.showLoading()
    this.setData({
      cardInputShow: 'show'
    })
  }
})
