let token = require('../../utils/token.js')
let mango = require('../../utils/nameSpace.js')
Page({
  data: {
    radioClass: true,
    alertShow: 'hide'
  },
  radioChange(e) {
    this.setData({
      name: '',
      phone: '',
      surplusNum: '',
      cardNum: '100019',
      account: '11608050',
      alertShow: 'show',
      alertMsg: ''
    })
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (option) {
    this.setVipInfo(option.cardNum)
    if (option.cardNum && option.account) {
      this.setData({
        cardNum: option.cardNum,
        account: option.account
      })
    }
  },

  // 核销
  verify(e) {
    // 显示加载动画
    wx.showLoading()
    let [_this, secretKey, timestamp, count] = [this, mango.secretKey, mango.getTimestamp(), e.detail.value.count]
    if (count % 0.5) {
      wx.showToast({
        title: '核销次数应该为0.5的整数！',
        icon: 'none',
        duration: 2000
      })
      wx.hideLoading()
      return
    }
    token.then(function(token) {
      let [arr, url] = [[
        ['account', _this.data.account],
        ['cardNum', _this.data.cardNum],
        ['consumeNum', count], // 核销次数]
        ['secretKey', secretKey],
        ['timestamp', timestamp]
      ],`${mango.path}cancelAfterVerification`]
      let sign = mango.getSign(arr)
      // 发起请求
      wx.request({
        method: 'POST',
        url: url,
        data: {
          account: _this.data.account,
          cardNum: _this.data.cardNum,
          consumeNum: e.detail.value.count,
          secretKey: secretKey,
          timestamp: timestamp,
          sign: sign
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': token
        },
        success: function(res) {
          // 隐藏加载动画
          wx.hideLoading()
          res = res.data
          if (res.status) {
            // 核销成功提示框
            _this.setData({
              alertShow: 'show',
              alertMsg: '核销成功！'
            })
            // wx.showModal({
            //   title: '核销成功！',
            //   showCancel: false,
            //   success: function(res) {
            //     if (res.confirm) {
            //       wx.navigateBack({
            //         delta: 1
            //       })
            //     }
            //   }
            // })
          } else {
            wx.showToast({
              title: '核销失败！',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
    })
  },

  // 填入用户数据
  setVipInfo(cardNum) {
    let [_this, secretKey, timestamp] = [this, mango.secretKey, mango.getTimestamp()]
    token.then(function(token) {
      let [arr, url] = [[
        ['cardNum', cardNum],
        ['secretKey', secretKey],
        ['timestamp', timestamp]
      ],`${mango.path}getByCardNum`]
      let sign = mango.getSign(arr)
      // 发起请求
      wx.request({
        method: 'POST',
        url: url,
        data: {
          cardNum: cardNum,
          secretKey: secretKey,
          timestamp: timestamp,
          sign: sign
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': token
        },
        success: function(res) {
          res = res.data
          if (res.status) {
            res = res.userInfo
          } else {
            _this.setData({
              alertShow: 'show',
              alertMsg: res.msg
            })
            return
          }
          _this.setData({
            name: res.name,
            phone: res.phone,
            surplusNum: res.surplusNum
          })
        },
        fail: function(res) {
          console.log(res)
        }
      })
    })
  }
})
