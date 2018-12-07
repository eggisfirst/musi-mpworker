Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  vipIn() {
    wx.navigateTo({
      url: `../../pages/index/index`
    })
  },
  voteIn() {
    wx.navigateTo({
      url: `../../pages/vote/voteIn/voteIn`
    })
  }
})