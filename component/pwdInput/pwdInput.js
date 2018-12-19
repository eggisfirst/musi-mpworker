Component({
  properties: {
    password:Number
  },
  data: {
    password:null
  },
 

  methods: {
    //获取密码
    getPwd(e) {
      this.setData({
        password: e.detail.value
      })
    },
    //验证密码
    submit() {
      console.log(this.data.password)
      wx.navigateTo({
        url: '../votePage/votePage',
      })
    },
  }
})