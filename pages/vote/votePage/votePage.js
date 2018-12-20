let mango = require('../../../utils/nameSpace')

Page({
  data: {
    list:[],
    comments:'',
    endTime:'',
    title:'',
    tips:true,
    jsCode:'',
    unionid:''
  },
  onLoad: function (options) {
    // console.log(options.titleId)
    // const id = options.titleId
    this.getData()
  
  },
  radioChange(e) {
    console.log(e.detail.value)
  },
  checkboxChange(e) {
    console.log(e.detail.value)
  },
  textAreaChange(e) {
    console.log(e.detail.value)
  },
  sliderChange(e) {
    console.log(e.detail.value)
  },
  getData() {
    wx.request({
      url: 'http://10.11.8.207/api/voteInfo/info',
      data:{id:'1075307717633040386'},
      // header: {'content-type': 'application/x-www-form-urlencoded'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if(res) {
          this.setData({
            list: res.data.data.questionList,
            comments: res.data.data.comments,
            endTime: res.data.data.endTime,
            title: res.data.data.title
          })
          console.log(res.data.data.questionList)
        }
      },
      fail: function(res) {console.log(res)},
    })
  },
  submit() {
        wx.getStorage({		//key是必须的。
          key : "code",
          success: (res) => {
            this.setData({
              jsCode:res.data
            })
        let timestamp = mango.getTimestamp()
        let code = this.data.jsCode
        let arr= [
          ['jsCode',code],
          ['type','derucci'],
          ['secretKey', '477a1d7cc03d21d5abce55ec12170d33'],
          ['timestamp', timestamp]
        ]
        let sign = mango.getSign(arr)
        wx.request({
          url:'https://derucci.net/api/public/v1/sns/jscode2session',
          data:{
            jsCode:code,
            type:'derucci',
            timestamp,
            secretKey:'477a1d7cc03d21d5abce55ec12170d33',
            sign,
          },
          method: "GET",
          dataType: 'json',
          responseType: 'text',
          success:(res) => {
            this.setData({
              unionid: res.data.unionid
            })
          },
          fail:(err) => {
            console.log('err',err)
          }
        })
          }
        })
        console.log(1111,this.data.unionid)
    // wx.request({
    //   url: 'http://10.11.8.207/api/voteAnswer/saveAnswer',
    //   data:{
    //     voteId: '1',
    //     openId: '1',
    //     question: [{
    //       id: '1',
    //       options: '1',
    //       answer: '1',
    //       score: '1'
    //     }]
    //   },
    //   // header: {'content-type': 'application/x-www-form-urlencoded'},
    //   method: 'POST',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (res) => {
    //     if(res) {
          
    //       console.log(res)
    //     }
    //   },
    //   fail: function(res) {console.log(res)},
    // })
  }
})