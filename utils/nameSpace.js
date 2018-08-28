let sha1 = require('./sha1')
let token = require('../utils/token.js')

let init = (function() {
  function Mango() {
    // this.port = 'http://10.11.8.7/'
    this.port = 'https://derucci.net/'
    this.path = `${this.port}api/vip/v1/`
    // this.path = `${path}api/public/v1/`
    this.publicPath = `${this.port}api/public/v1/`
    this.secretKey = '477a1d7cc03d21d5abce55ec12170d33'

    // 获取时间戳
    this.getTimestamp = () => {
      let date = new Date()
      let timestamp = date.getTime()
      return timestamp
    }

    // 参数加密
    this.getSign = (arr) => {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str = str === '' ? `${arr[i][0]}=${arr[i][1]}` : `${str}&${arr[i][0]}=${arr[i][1]}`
      }
      console.log('加密参数：', str)
      return sha1.hex(str)
    }

    // 获取openid
    this.getOpenid = (code, type) => {
      let [_this, secretKey, timestamp] = [this, this.secretKey, this.getTimestamp()]
      let promise = new Promise(function(resolve, reject) {
        console.log('开始获取openid')
        token.then(function(token) {
          console.log(`获取的token：${token}`)
          let [arr, url] = [[
            ['jsCode', code],
            ['secretKey', secretKey],
            ['timestamp', timestamp],
            ['type', type]
          ],`${_this.publicPath}sns/jscode2session`]
          let sign = _this.getSign(arr)
          // 发起请求
          wx.request({
            method: 'GET',
            url: url,
            data: {
              jsCode: code, // code码
              secretKey: secretKey,
              timestamp: timestamp,
              type: type,
              sign: sign
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': token
            },
            success: function(res) {
              resolve(res)
            }
          })
        })
        // .catch(function (error) {
        //   console.log('获取token失败！')
        // })
      })
      return promise
    }
  }
  return new Mango()
}())

module.exports = init