// components/guide/guide.js
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
    isShow: true
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function() {
    let mask_flag = wx.getStorageSync('mask')
    if (mask_flag !== '') {
      this.setData({
        isShow: mask_flag
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideMask: function() {
      wx.setStorageSync('mask', false)
      let mask_flag = wx.getStorageSync('mask')
      this.setData({
        isShow: mask_flag
      })
    }
  },

  noMove: function() {
    return
  }

})