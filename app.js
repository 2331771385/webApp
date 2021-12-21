
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    const res = wx.getSystemInfoSync()
    var statusbarH = res.statusBarHeight
    this.globalData.statsuBarHeight=statusbarH;
    this.globalData.sysWidth = res.screenWidth;
    this.globalData.sysHeight = res.screenHeight;
  },

  /**
   * 这里定义的是全局变量，在这里定义的变量在每一个页面中都可以使用
   */
  globalData: {
    token: '',
    jobList: wx.getStorageSync('jobData') || [],
    userInfo: null,  // 获取微信登录者的用户名和头像
    msgList: [],

    statsuBarHeight:0,
    sysWidth:0,
    sysHeight:0,
  }
})
