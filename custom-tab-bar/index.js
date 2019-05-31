// tabBarComponent/tabBar.js
const app = getApp();

Component({
  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.includes("iPhone X"),
    selected: 0,
    backgroundColor: "#fff",
    color: "#979795",
    selectedColor: "#2d4d7e",
    list: [{
        pagePath: "/pages/h2-order/list-order/list-order",
        iconPath: "icon/tab-order.png",
        selectedIconPath: "icon/tab-order-light.png",
        text: "订单列表"
      },
      {
        pagePath: "/pages/h2-account/home/home",
        iconPath: "icon/tab-home.png",
        selectedIconPath: "icon/tab-home-light.png",
        text: "个人中心"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      console.log(e)
      const data = e.currentTarget.dataset
      this.setData({
        selected: data.index
      })
    }
  }
})