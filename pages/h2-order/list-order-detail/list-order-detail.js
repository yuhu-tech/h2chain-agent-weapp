// pages/h2-order/list-order-detail/list-order-detail.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    order_info: '',
    pt_list: [{}],
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
    return
    this.doSearch()
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

  doSearch: function() {
    gql.query({
      query: `query {
        search(
          orderid: "${this.data.orderid}"
        ) {
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
          hotel{
            hotelname
          }
          postorder{
            salary
            isfloat
          }
          countyet
          maleyet
          femaleyet
          pt{
            ptid
            ptorderstate
            name
            idnumber
            gender
            wechatname
            phonenumber
            worktimes
            workhours
            height
            weight
            remark{
              startdate
              enddate
              realsalary
              isworked
            }
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let avatar = util.selectAvatar(res.search[0].originorder.occupation)
      util.formatItemOrigin(res.search[0])
      if (res.search[0].modifiedorder.length > 0) {
        util.formatItemModify(res.search[0])
      }
      if (res.search[0].pt.length === 0) {
        wx.showToast({
          title: '还没有人报名',
          icon: 'none'
        })
      }
      this.setData({
        order_info: res.search[0],
        pt_list: res.search[0].pt,
        avatar: avatar
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    })
  },

  doCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number
    })
  },

  doSearchName: function(e) {
    console.log(e)
    gql.query({
      query: `query {
        search(
          orderid:"${this.data.orderid}"
          ${e.detail.value ? `ptname: "${e.detail.value}"` : ''}
        ) {
          pt{
            ptid
            ptorderstate
            name
            idnumber
            gender
            wechatname
            phonenumber
            worktimes
            workhours
            height
            weight
            remark{
              startdate
              enddate
              realsalary
              isworked
            }
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      if (res.search[0].pt.length === 0) {
        wx.showToast({
          title: '无结果',
          icon: 'none'
        })
      }
      this.setData({
        pt_list: res.search[0].pt
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
  }

})