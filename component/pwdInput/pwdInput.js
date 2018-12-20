Component({
  properties: {
    password:String,
    dataID:String
  },
  data: {
  },
  methods: {
    //给父组件传值
    closeBtn() {
      const myEventDetail = {
        isEncrypt: false
      } 
      this.triggerEvent('encryptvent', myEventDetail, {})
    },
    //获取密码
    onblur(e) {
      const password = e.detail.value
      this.setData({
        password
      })
    },
    //验证密码
    submit() {
      const id = this.data.dataID
      const password = this.data.password
      wx.request({
        url: 'http://10.11.8.207/api/voteInfo/verify',
        data: {
          id,
          encrypt: password,
        },
        // header: {'content-type': 'application/x-www-form-urlencoded'},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          if(res) {
            if(res.data.status == 1) {
              wx.navigateTo({
                url: `../votePage/votePage?titleId=${id}`
              })
            }else {
              wx.showToast({
                title: '密码错误',
                icon: 'none'
              })
            }
          }
        },
        fail: function(res) {console.log(res)},
      })
     
    },
  }
})