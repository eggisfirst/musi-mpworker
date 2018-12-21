import {IndexModel} from '../../../models/index'
const indexModel = new IndexModel()

Page({
  data: {
    title: [],
    isEncrypt: false,
    id: null,
    searchVal:''
  },
  onLoad() {
    this.getData()
  },
  //后退的时候弹框隐藏，搜索框清零。
  onShow() {
    this.setData({
      isEncrypt: false,
      searchVal: ''
    })
  },
  //接收组件传过来到值，弹框隐藏
  encryptEvent(e) {
    const isEncrypt = e.detail.isEncrypt
    this.setData({
      isEncrypt
    })
  },
  //获取input的值
  onblur(e) {
    const searchVal = e.detail.value
    this.setData({
      searchVal
    })
  },
  //搜索功能
  search() {
    //搜索空值的时候不跳转
    const value = this.data.searchVal
    this.getData(value)
  },
  //进入问卷
  voteIn(e){
    const isEncrypt = e.currentTarget.dataset.encrypt
    const id = e.currentTarget.dataset.id
    this.setData({
      id 
    })
    //判断是否加密
    if(isEncrypt) {
      this.setData({
        isEncrypt : true,
      })
    }else {
      wx.navigateTo({
        url: `../votePage/votePage?titleId=${id}`
      })
    }
  },
  //获取标题列表
  getData(value='') {
    indexModel.getTitleList(value).then(res => {
      const title = res.data.page.list
      this.setData({
        title
      })
    })
  }
})