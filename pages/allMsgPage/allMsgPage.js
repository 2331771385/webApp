const app = getApp();
Page({
  data: {
    msgList: [],
    poiName: '西门',
    backIcon: '../../common/img/back1.png',
    line: '../../common/img/line.png',
    colleaps: '../../common/img/colleaps.png',
    isColleaps: '../../common/img/up.png',
    

    // backIcon: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/back1.png',
    // line: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/line.png',
    // colleaps: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/colleaps.png',
    // isColleaps: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/up.png',
    
    // 点击输入框弹起键盘
    statsuBarHeight: app.globalData.statsuBarHeight,
    headHeight:40,
    chatListHeight:0,
    keyboardHeight:0,
    inutPanelHeight:50,
    toView: "item0",
    curMessage:"",
    focus: false,
    placeholder: '留下属于你的精彩评论吧',
    isAnswer: false,
    currentParent: ''
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
      // this.scroll2Bottom();
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
    let self = this;
    if (app.globalData.userInfo == null) {
      wx.getUserProfile({
        desc: '必须授权成功后才能进行留言',
        success(res) {
          app.globalData.userInfo = res.userInfo;
          console.log(res.userInfo);
          // self.sendSuccess();
        },
        fail(err) {
          wx.showToast({
            title: '授权成功之后才能留言',
            duration: 2000,
            icon: "none"
          })
        }
      })
    } else {
      this.sendSuccess();
    }
  },

  sendSuccess() {
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
    if (this.data.isAnswer) {
      let currentParentId = this.data.currentParent;
      for(let i = 0; i < messageList.length; i++) {
        if (messageList[i].id == currentParentId) {
          if (!messageList[i].hasOwnProperty('children')) {
            messageList[i].children = [];
          }
          messageList[i].children.push({
            msgImg: currentUser.avatarUrl, // 留言者的微信头像
            msgName: currentUser.nickName, //留言者的名称
            msgDes: curMessage, //留言描述
            msgTimer: currentTime
          })
        }
      }
    } else {
      messageList.unshift({
        id: messageList.length + 1,
        msgImg: currentUser.avatarUrl, // 留言者的微信头像
        msgName: currentUser.nickName, //留言者的名称
        msgDes: this.data.curMessage, //留言描述
        msgTimer: currentTime
      });
    }
    
    this.setData({
      isAnswer: false,
      curMessage:"",
      currentParent: '',
      msgList: messageList
    })
    app.globalData.msgList = this.data.msgList;
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
  hasColleaps(event) {
    let index = event.currentTarget.dataset.set;
    let data = app.globalData.msgList;
    for(let i = 0; i < data.length; i++) {
      if (data[i].id == index) {
        data[i].isClick = !data[i].isClick;
        break;
      }
    };
    app.globalData.msgList = data;
    this.setData({
      msgList: app.globalData.msgList
    });
  },

  // 点击回复按钮，出现弹框
  getAnswer(e) {
    let msg = e.currentTarget.dataset.set;
    let self = this;
    if (app.globalData.userInfo != null) {
      this.setData({
        placeholder: `回复${msg.msgName}`,
        focus: 'auto',
        isAnswer: true,
        currentParent: msg.id
      });
      return;
    };
    wx.getUserProfile({
      desc: '必须授权成功后才能进行留言',
      success(res) {
        self.setData({
          placeholder: `回复${msg.msgName}`,
          focus: 'auto',
          isAnswer: true,
          currentParent: msg.id
        });
        app.globalData.userInfo = res.userInfo;
      },
      fail(err) {
        wx.showToast({
          title: '授权成功之后才能留言',
          duration: 2000,
          icon: "none"
        })
      }
    })
  },

  // 点击页面中的空白区域，隐藏软键盘
  hideInput() {
    this.setData({
      focus: false,
      placeholder: '留下属于你的精彩评论吧',
    })
  }

})