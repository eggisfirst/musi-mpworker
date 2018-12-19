import request from '../../../utils/common'

Page({
  data: {
    title: [],
    searchVal: '',
    isEncrypt: false,
    id: null
  },
  //获取input的值
  getVal(e) {
    this.setData({
      searchVal: e.detail.value
    })
  },
  //搜索功能
  search() {
    var val = this.data.searchVal
    console.log(val)
    wx.request({
      url: 'http://10.11.8.207/api/voteInfo/list',
      data: val,
      // header: {'content-type': 'application/x-www-form-urlencoded'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if(res) {
          this.setData({
            title:res.data.page.list
          })
        }
      },
      fail: function(res) {console.log(res)},
    })
    // request({
    //   url: "/voteInfo/list",
    //   method: 'GET',
    //   data: val,
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res){
    //     console.log(1111,res)
    //   }
    // })
  },
  //进入问卷
  voteIn(e){
    let status = e.currentTarget.dataset.encrypt
    if(status) {
      this.setData({
        isEncrypt : true,
        id : e.currentTarget.dataset.id
      })
    }else {
      wx.navigateTo({
        url: `../votePage/votePage`
      })
    }
  }
})