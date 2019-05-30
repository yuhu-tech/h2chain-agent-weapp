// pages/h2-order/history-order/history-order.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    order_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    gql.query({
      query: `query{
        search(
          state:2
        ){
          state
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
          }
          hotel{
            hotelname
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      for (let item of res.search) {
        item.avatar = util.selectAvatar(item.originorder.occupation)
        util.formatItemOrigin(item)
        if (item.modifiedorder.length > 0) {
          util.formatItemModify(item)
        }
      }
      console.log('success', res);
      this.setData({
        order_list: res.search
      })
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
    wx.showNavigationBarLoading();
    this.setData({
      date: ''
    })
    gql.query({
      query: `query{
        search(
          state:2
        ){
          state
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
          }
          hotel{
            hotelname
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      for (let item of res.search) {
        item.avatar = util.selectAvatar(item.originorder.occupation)
        util.formatItemOrigin(item)
        if (item.modifiedorder.length > 0) {
          util.formatItemModify(item)
        }
      }
      console.log('success', res);
      this.setData({
        order_list: res.search
      })
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
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

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    let timeStamp = new Date(`${this.data.date}T00:00:00`).getTime() / 1000
    gql.query({
      query: `query{
        search(
          datetime:${Number(timeStamp)}
          state:2
        ){
          state
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
          }
          hotel{
            hotelname
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      for (let item of res.search) {
        item.avatar = util.selectAvatar(item.originorder.occupation)
        util.formatItemOrigin(item)
        if (item.modifiedorder.length > 0) {
          util.formatItemModify(item)
        }
      }
      console.log('success', res);
      this.setData({
        order_list: res.search
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
  },

  goDetail: function(e) {
    wx.navigateTo({
      url: `/pages/h2-order/history-order-detail/history-order-detail?orderid=${e.currentTarget.dataset.orderid}`,
    })
  }

})