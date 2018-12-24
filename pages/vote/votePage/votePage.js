let mango = require('../../../utils/nameSpace')
import {IndexModel} from '../../../models/index'
const indexModel = new IndexModel()

Page({
  data: {
    tips: -1,
    list: [],
    question: [],
    id: '',
    openid: '',
    comments: '',
    endTime: '',
    title: '',
    showTip: false,
    tipsArr:[]
  },
  onLoad: function (options) {
    let id = options.titleId
    // let id = '1075307717633040386'
    this.setData({ id })
    this._getOpenid()
    this._getQuestionList(id)
  },
  //表单提交
  formSubmit(e) {
    let value = e.detail.value
    this._dealData(value)
  },
  //获取问题列表
  _getQuestionList(id) {
    indexModel.getQuestionList(id).then(res => {
      const list = res.data.data.questionList
      const comments = res.data.data.comments
      const endTime = res.data.data.endTime
      const title = res.data.data.title
      this.setData({
        list,
        comments,
        endTime,
        title
      })
      this._setTitle()
    })
  },
  //设置导航标题
  _setTitle() {
    wx.setNavigationBarTitle({
      title: this.data.title//页面标题为路由参数
    })
  },
  //获取openid
  _getOpenid() {
    wx.getStorage({		
      key: "openid",
      success: (res) => {
        let openid = res.data
        this.setData({ openid })
      }
    })
  },
  //表单提交时请求
  _sendOptions() {
    const voteId = this.data.id
    const openid = this.data.openid
    const question = this.data.question
    indexModel.sendOptions(voteId,openid,question,"POST").then(res => {
      if(res.data.status === 1) {
        this.setData({
          showTip: true
        })
        this._toVoteIn()
      }
    })
  },
  //回到votein页面
  _toVoteIn() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../voteIn/voteIn'
      })
    }, 2000);
  },
  //处理数据
  _dealData(value) {
    let list = this.data.list
    let questionArr = []
    let tipsArr = []
    for(var key in value) {
      list.forEach((item,index) => {
        //必填没有填弹出提示
        if(key == item.id){
          if(item.required) {
            if(value[key] == '' || value[key] == []) {
              tipsArr[index] = item.id
              this.setData({
                tipsArr
              })
            }else{
              this.setData({
                tipsArr:[]
              })
            }
          }
        }
        if(tipsArr.length === 0){
          //获得每道题答案
          if(item.id == key){
            if(item.type == 0) {
              questionArr.push({id:key,options:value[key]})
            }else if(item.type == 1) {
              questionArr.push({id:key,options:`${value[key]}`})
            }else if(item.type == 2) {
              questionArr.push({id:key,answer:value[key]})
            }else if(item.type == 3) {
              questionArr.push({id:key,score:value[key]})
            }
          }
          this.setData({
            question: questionArr
          })
        }
      })
      if(tipsArr.length === 0 && questionArr.length === list.length){
        this._sendOptions()
      }
    }
  }
}) 