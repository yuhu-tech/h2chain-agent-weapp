var Gql = require('wxapp-graphql');
var GraphQL = Gql.GraphQL;
var config = require('../config.js')
var app = getApp()

var gql = GraphQL({
  //设置全局url
  url: config.service.host, // url必填

  //设置全局动态header
  header: function () {
    let token = wx.getStorageSync('token')

    return {
      "Authorization": "Bearer " + token
    }
  },
  //设置全局错误拦截
  errorHandler: function(res) {
    /* wx.showToast({
      title: '登录已过期',
      success: () => {
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/h2-account/login/login',
          })
        }, 1000)
      }
    }) */
  }
}, true);

module.exports = gql;