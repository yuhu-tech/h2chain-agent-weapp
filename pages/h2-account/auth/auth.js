// pages/h2-account/auth/auth.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options: options
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.doLogin()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  doGetAgentId: function() {
    gql.query({
      query: `query {
        me {
          id
        }
      }`
    }).then((res) => {
      console.log('success', res);
      wx.setStorageSync('agentId', res.me.id)
    }).catch((error) => {
      console.log('fail', error);
    });
  },

  doLogin: function() {
    wx.login({
      success: (res_login) => {
        gql.mutate({
          mutation: `mutation {
            login(
              jscode:"${res_login.code}"
            ){
              token
            }
          }`
        }).then((res) => {
          console.log('success', res);
          wx.setStorageSync('token', res.login.token)
          this.doGetAgentId()
          /* adviser */
          if (this.data.options.adviser) {
            console.log('check adviser')
            wx.navigateTo({
              url: `/pages/h2-order/share/share?orderid=${this.data.options.orderid}`,
            })
          }
          /* share */
          if (this.data.options.share) {
            console.log('check share')
            wx.setStorageSync('share', 'share')
            wx.setStorageSync('orderid', this.data.options.orderid)
            wx.switchTab({
              url: `/pages/h2-order/list-order/list-order`,
            })
          }
        }).catch((error) => {
          console.log('fail', error);
        });
      }
    })
  }

})