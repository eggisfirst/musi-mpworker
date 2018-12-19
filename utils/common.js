let baseUrl = "http://10.11.8.207/api"

function request(params) {
  wx.request({
    url: baseUrl + params.url,
    method: params.type,
    data: params.data,
    success: function (res) {
      if (res.data.code == 0) {				//判断传过来的状态
        params.success(res.data.data)
      }else {
        showError()
      }
    },
    fail: function () {
      showError()
    }
  })
}

export default request