// components/toptip.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    text: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: function(param) {
      this.setData({
        text: param
      })
      setTimeout(() => {
        this.setData({
          text: ''
        })
      }, 2000)
    }
  }
})