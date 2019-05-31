// pages/h2-order/share/share.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    order: '',
    avatar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.orderid) {
      this.setData({
        orderid: options.orderid
      })
    }
    wx.showShareMenu({
      withShareTicket: true
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
    wx.setStorageSync('share', 'done')
    gql.query({
      query: `query{
        search(
          orderid:"${this.data.orderid}"
          state:21
        ){
          originorder{
            orderid
            occupation
            datetime
            duration
            mode
            count
            male
            female
          }
          modifiedorder{
            changeddatetime
            changedduration
            changedmode
            changedcount
            changedmale
            changedfemale
          }
          postorder{
            salary
            workcontent
            attention
          }
          hotel{
            hotelname
            hoteladdress
            hotelphone
            hotelintroduction
            cover
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      console.log('success', res);
      wx.showToast({
        title: '处理中',
        icon: 'loading'
      })
      let avatar = util.selectAvatar(res.search[0].originorder.occupation)
      util.formatItemOrigin(res.search[0])
      if (res.search[0].modifiedorder.length > 0) {
        util.formatItemModify(res.search[0])
      }
      res.search[0].postorder.workcontent = decodeURI(res.search[0].postorder.workcontent)
      res.search[0].postorder.attention = decodeURI(res.search[0].postorder.attention)
      this.setData({
        order: res.search[0]
      })
      wx.hideToast()
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
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
  onShareAppMessage: function(res) {
    console.log(res)
    /* TODO */
    /* recall */
    /* agent与订单产生关联 */
    return {
      title: '这位代理，该干活了。',
      path: `/pages/h2-account/auth/auth?share=share&orderid=${this.data.orderid}`
    }
  }
})