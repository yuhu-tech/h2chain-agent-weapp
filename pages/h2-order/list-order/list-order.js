// pages/h2-order/list-order/list-order.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    order_list: [{}]
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    /* share */
    if (wx.getStorageSync('share') === 'share') {
      wx.navigateTo({
        url: `/pages/h2-order/list-order-info/list-order-info?orderid=${wx.getStorageSync('orderid')}`,
      })
      return
    }
    /* date mode */
    if (this.data.date) {
      this.bindDateChange()
      return
    }
    gql.query({
      query: `query{
        search(
          state:11
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
      console.log('success', res);
      if (res.search.length === 0) {
        wx.showToast({
          title: '暂无订单',
          icon: 'none'
        })
        return
      }
      for (let item of res.search) {
        item.avatar = util.selectAvatar(item.originorder.occupation)
        util.formatItemOrigin(item)
        if (item.modifiedorder.length > 0) {
          util.formatItemModify(item)
        }
      }
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
          state:11
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
      console.log('success', res);
      let tempWait = []
      let tempIng = []
      if (res.search.length === 0) {
        wx.showToast({
          title: '暂无订单',
          icon: 'none'
        })
      }
      for (let item of res.search) {
        item.avatar = util.selectAvatar(item.originorder.occupation)
        util.formatItemOrigin(item)
        if (item.modifiedorder.length > 0) {
          util.formatItemModify(item)
        }
        if (item.state === 0) {
          tempWait.push(item)
        } else {
          tempIng.push(item)
        }
      }
      this.setData({
        order_list_wait: tempWait,
        order_list_ing: tempIng
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
    if (e) {
      this.setData({
        date: e.detail.value
      })
    }
    let timeStamp = new Date(`${this.data.date}T00:00:00`).getTime() / 1000
    gql.query({
      query: `query{
        search(
          state:11
          datetime:${Number(timeStamp)}
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
      console.log('success', res);
      let tempWait = []
      let tempIng = []
      for (let item of res.search) {
        item.avatar = util.selectAvatar(item.originorder.occupation)
        util.formatItemOrigin(item)
        if (item.modifiedorder.length > 0) {
          util.formatItemModify(item)
        }
        if (item.state === 0) {
          tempWait.push(item)
        } else {
          tempIng.push(item)
        }
      }
      this.setData({
        order_list_wait: tempWait,
        order_list_ing: tempIng
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
  },

  goOrderInfo: function(e) {
    wx.navigateTo({
      url: `/pages/h2-order/list-order-info/list-order-info?orderid=${e.currentTarget.dataset.orderid}`,
    })
  },

  goOrderDetail: function(e) {
    wx.navigateTo({
      url: `/pages/h2-order/list-order-detail/list-order-detail?orderid=${e.currentTarget.dataset.orderid}`,
    })
  },

  jumpToPt: function(e) {
    let agentId = wx.getStorageSync('agentId')
    wx.navigateToMiniProgram({
      appId: 'wx0f2ab26c0f65377d',
      envVersion: 'trial',
      path: `/pages/h2-account/auth/auth?agent=agent&inviterid=${agentId}&orderid=${e.currentTarget.dataset.orderid}`,
      complete: res => {
        console.log(res)
        /* bind order */
        gql.mutate({
          mutation: `mutation{
            transmit(
              orderid:${e.currentTarget.dataset.orderid}
            )
          }`
        }).then((res) => {
          console.log('success', res);
        }).catch((error) => {
          console.log('fail', error);
        });
      }
    })
  }

})