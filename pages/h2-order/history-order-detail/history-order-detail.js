// pages/h2-order/history-order-detail/history-order-detail.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    order_info: '',
    value_channel: '',
    pt_list: [],
    multiArray: [
      ['代理端', 'PT分享', '顾问端分享', '现场扫码', '客户端报名'],
      []
    ],
    multiIndex: [0, 0],
    regMode: '',
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
    this.setData({
      ['multiArray[1]']: ['张大海', '赵小豪'],
      agent_list: ['张大海', '赵小豪'],
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
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
            hash
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
      for (let item of res.search[0].pt) {
        if (item.remark) {
          let start = new Date(item.remark.startdate * 1000)
          let end = new Date(item.remark.enddate * 1000)
          item.duration = `${util.formatNumber(start.getHours())}:${util.formatNumber(start.getMinutes())}~${util.formatNumber(end.getHours())}:${util.formatNumber(end.getMinutes())}`
        }
      }
      this.setData({
        order_info: res.search[0],
        pt_list: res.search[0].pt,
        avatar: avatar
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
  onShareAppMessage: function() {

  },

  doCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number,
    })
  },

  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
    console.log('改变了值', this.data.multiIndex)
  },

  bindMultiPickerColumnChange(e) {
    let multiArray = this.data.multiArray;
    let multiIndex = this.data.multiIndex
    multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (multiIndex[0]) {
          case 0:
            multiArray[1] = this.data.agent_list
            break
          case 1:
            multiArray[1] = this.data.pt_list
            break
          case 2:
            multiArray[1] = []
            break
          case 3:
            multiArray[1] = []
            break
          case 4:
            multiArray[1] = []
            break
        }
        multiIndex[1] = 0
        break
      default:
        break
    }
    console.log('移动了列', multiIndex)
    this.setData({
      multiArray: multiArray,
      multiIndex: multiIndex
    })
  },

  doSearch: function(e) {
    gql.query({
      query: `query {
        search(
          orderid:"${this.data.orderid}"
          ${e.detail.value ? `ptname: "${e.detail.value}"` : ''}
        ) {
          pt{
            hash
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
      if (!res.search[0].pt || res.search[0].pt.length === 0) {
        wx.showToast({
          title: '无结果',
          icon: 'none'
        })
      }
      for (let item of res.search[0].pt) {
        if (item.remark) {
          let start = new Date(item.remark.startdate * 1000)
          let end = new Date(item.remark.enddate * 1000)
          item.duration = `${util.formatNumber(start.getHours())}:${util.formatNumber(start.getMinutes())}~${util.formatNumber(end.getHours())}:${util.formatNumber(end.getMinutes())}`
        }
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
  },

  goPtInfo: function(e) {
    wx.setStorageSync('pt_info', e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/h2-order/pt-info/pt-info',
    })
  },

  doNote: function(e) {
    wx.setStorageSync('remark', e.currentTarget.dataset.item.remark)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/h2-order/list-order-note/list-order-note?orderid=${this.data.order_info.originorder.orderid}&ptid=${item.ptid}&salary=${this.data.order_info.postorder.salary}`,
    })
  }

})