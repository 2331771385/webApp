const app = getApp();
Page({
  data: {
    msgList: [],
    poiName: '西门',
    backIcon: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/back1.png',
    line: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/line.png',
    colleaps: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/colleaps.png',
    isColleaps: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/up.png',
    isClick: false,
    
    // 点击输入框弹起键盘
    statsuBarHeight: app.globalData.statsuBarHeight,
    headHeight:40,
    chatListHeight:0,
    keyboardHeight:0,
    inutPanelHeight:50,
    toView: "item0",
    curMessage:"",
  },

  onLoad(options) {
    this.setData({
      poiName: options.poiName,
      msgList: app.globalData.msgList
    });
    this.setChatListHeight();
    wx.onKeyboardHeightChange(res => { //监听键盘高度变化
      this.setData({
        keyboardHeight: res.height
      });
      this.setChatListHeight();
      this.scroll2Bottom();
    });
  },


  setChatListHeight() {
    this.setData({
      chatListHeight: app.globalData.sysHeight - app.globalData.statsuBarHeight - this.data.headHeight - this.data.keyboardHeight- this.data.inutPanelHeight
    })
  },
  hideKeyboard(){
    wx.hideKeyboard();
    this.hideMediaPanel();
  },
  getInput(e){
    let value = e.detail.value;
    this.setData({
      curMessage: value
    });
  },
  send() {
    let curMessage = this.data.curMessage;
    if (curMessage.trim() === "") {
      wx.showToast({
        title: '请输入聊天内容',
        duration: 2000,
        icon: "none"
      })
      return;
    }
    let messageList = this.data.msgList;
    let currentTime = this.getCurrentTime();
    let currentUser = app.globalData.userInfo;
    messageList.unshift({
      msgImg: currentUser.avatarUrl, // 留言者的微信头像
      msgName: currentUser.nickName, //留言者的名称
      msgDes: this.data.curMessage, //留言描述
      msgTimer: currentTime
    });
    this.setData({
      curMessage:"",
      msgList: messageList
    })
    app.globalData.userInfo = this.data.msgList;
  },

  // 获取当前时间
  getCurrentTime() {
    let timer = new Date();
    let year = timer.getFullYear();
    let month = timer.getMonth() + 1;
    let date = timer.getDate();
    let hours = timer.getHours();
    let second = timer.getSeconds();
    let currentTime = year + '-' + month + '-' + date + ' ' + hours + ':' + second;
    return currentTime;
  },

  // 返回到上一页面中
  gotoBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 点击展开或者收起评论
  hasColleaps() {
    let hasClick = this.data.isClick;
    this.setData({
      isClick: !hasClick
    })
    console.log('======');
  }
})