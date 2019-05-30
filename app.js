//app.js
App({
  onLaunch: function(ops) {
    wx.hideTabBar();
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    systemInfo: null
  }
})