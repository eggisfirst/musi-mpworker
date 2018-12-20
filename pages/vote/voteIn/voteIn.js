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
      searchVal: '',
      isEncrypt: false
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
    if(value === '') {
      return
    }
    this.getData(value)
  },
  //进入问卷
  voteIn(e){
    const status = e.currentTarget.dataset.encrypt
    const id = e.currentTarget.dataset.id
    this.setData({
      id 
    })
    if(status) {
      this.setData({
        isEncrypt : true,
      })
    }else {
      wx.navigateTo({
        url: `../votePage/votePage?titleId=${id}`
      })
    }
  },
  //ajax
  getData(value='') {
    indexModel.getVoteInList(value).then(res => {
      const title = res.data.page.list
      this.setData({
        title
      })
    })
  }
})