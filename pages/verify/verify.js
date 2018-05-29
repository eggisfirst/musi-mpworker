Page({
  data: {
    radioClass: true
  },
  radioChange(e) {
    console.log(e)
    this.setData({
      radioClass: e.detail.value === '男' ? true : false
    })
  },
  onLoad: function () {

  }
})
