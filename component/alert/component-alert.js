Component({
  // options: {
  //   multipleSlots: true // 在组件定义时的选项中启用多slot支持
  // },
  data: {
    // 这里是一些组件内部数据
    // alertShow: 'hide'
  },
  properties: {
    alertShow: String
   },
  methods: {
    sure() {
      var detail = {
        text: 'guang'
      }
      this.triggerEvent('alertEvent', detail)
      this.hideAlert()
    },
    hideAlert() {
      this.setData({alertShow: 'hide'})
    }
  }
})