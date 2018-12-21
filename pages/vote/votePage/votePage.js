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
    showTip: false
  },
  onLoad: function (options) {
    // let id = options.titleId
    let id = '1075961598004346881'
    this.setData({ id })
    this.getOpenid()
    this.getQuestionList(id)
  },
   //获取问题列表
   getQuestionList(id) {
    indexModel.getQuestionList(id).then(res => {
      // console.log(res.data.data.questionList)
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
    })
  },
  formSubmit(e) {
    let value = e.detail.value
    let list = this.data.list
    let arr = []
    let a = []
    for(var key in value) {
      list.forEach((item,index) => {
        if(key == item.id){
          if(item.required) {
            if(value[key] === '') {
              a.push(item.id)
            }
          }
        }
        // if(item.id == key){
        //   if(item.type == 0) {
        //     arr.push({id:key,options:value[key]})
        //   }else if(item.type == 1) {
        //     arr.push({id:key,options:`${value[key]}`})
        //   }else if(item.type == 2) {
        //     arr.push({id:key,answer:value[key]})
        //   }else if(item.type == 3) {
        //     arr.push({id:key,score:value[key]})
        //   }
        // }
      })
    }
    console.log(123,a[0])
    
    this.setData({
      question : arr,
      a
    })
    // this.sendOptions()
  },
  //获取openid
  getOpenid() {
    wx.getStorage({		
      key: "openid",
      success: (res) => {
        let openid = res.data
        this.setData({ openid })
      }
    })
  },
  //表单提交
  sendOptions() {
    const voteId = this.data.id
    const openid = this.data.openid
    const question = this.data.question
    indexModel.sendOptions(voteId,openid,question,"POST").then(res => {
      if(res.data.status == 1) {
        this.setData({
          showTip: true
        })
      }
    })
  }
}) 