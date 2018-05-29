// 获取token码
const token = (function() {
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      method: 'POST',
      url: 'https://derucci.net/app/token.api',
      data: {
        key: '994061370314006529',
        secretKey: '477a1d7cc03d21d5abce55ec12170d33'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data) {
          if (res.data.token) {
            resolve(res.data.token)
          }
        }
      }
    })
  })
  return promise
}())

module.exports = token