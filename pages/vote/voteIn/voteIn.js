// pages/vote/voteIn/voteIn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteTitle:[
      { title: '标题一xx投票', encryption: true },
      { title: '标题二xx投票', encryption: false },
      { title: '标题三xx评分', encryption: true },
      { title: '标题四xx投票', encryption: false},
    ],
    pwdInput:false
  },
  voteIn(e){
    let id = e.target.id
    let status = this.data.voteTitle[id].encryption
    if(status) {
      this.setData({
        pwdInput:true
      })
      console.log(this.data.pwdInput)
    }
    // wx.navigateTo({
    //   url: `../../pages/index/index`
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})