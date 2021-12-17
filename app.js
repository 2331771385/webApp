// app.js
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
    msgList: [
      {
        id: 1,
        msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/zs.png', // 留言者的微信头像
        msgName: '张三', //留言者的名称
        msgDes: '地理位置优越，景色优美。', //留言描述
        msgTimer: '2021-10-24 17:00',
        isClick: false,
        children: [
          {
            msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/ls.png', // 留言者的微信头像
            msgName: '李四', //留言者的名称
            msgDes: '打卡，景色秀丽。', //留言描述
            msgTimer: '2021-10-26 12:15'
          },
          {
            msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/wxh.png', // 留言者的微信头像
            msgName: '王小华', //留言者的名称
            msgDes: '校门还是那么大气，赞！', //留言描述
            msgTimer: '2021-10-25 16:35'
          },
          {
            msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/ls.png', // 留言者的微信头像
            msgName: '李四', //留言者的名称
            msgDes: '打卡，景色秀丽。', //留言描述
            msgTimer: '2021-10-26 12:15'
          },
          {
            msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/wxh.png', // 留言者的微信头像
            msgName: '王小华', //留言者的名称
            msgDes: '校门还是那么大气，赞！', //留言描述
            msgTimer: '2021-10-25 16:35'
          }
        ]
      },
      {
        id: 2,
        msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/ls.png', // 留言者的微信头像
        msgName: '李四', //留言者的名称
        msgDes: '打卡，景色秀丽。', //留言描述
        msgTimer: '2021-10-26 12:15',
        isClick: false,
        children: [
          {
            msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/ls.png', // 留言者的微信头像
            msgName: '李四', //留言者的名称
            msgDes: '打卡，景色秀丽。', //留言描述
            msgTimer: '2021-10-26 12:15'
          },
          {
            msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/wxh.png', // 留言者的微信头像
            msgName: '王小华', //留言者的名称
            msgDes: '校门还是那么大气，赞！', //留言描述
            msgTimer: '2021-10-25 16:35'
          }
        ]
      },
      {
        id: 3,
        msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/wxh.png', // 留言者的微信头像
        msgName: '王小华', //留言者的名称
        msgDes: '校门还是那么大气，赞！', //留言描述
        msgTimer: '2021-10-25 16:35',
        isClick: false
      }
    ],


    statsuBarHeight:0,
    sysWidth:0,
    sysHeight:0,
  }
})
