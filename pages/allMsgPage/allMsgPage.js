const app = getApp();
Page({
  data: {
    msgList: [],
    poiName: '西门',
    campusId: '',
    poiId: '',
    backIcon: 'http://116.62.20.146:7788/img/back1.png',
    line: 'http://116.62.20.146:7788/img/line.png',
    colleaps: 'http://116.62.20.146:7788/img/colleaps.png',
    isColleaps: 'http://116.62.20.146:7788/img/up.png',
    
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
      campusId: options.campusId,
      poiId: options.poiId,
      poiName: options.poiName,
      msgList: app.globalData.msgList
    });
    // this.getTalkList(options.campusId, options.poiId);
    this.setChatListHeight();
    wx.onKeyboardHeightChange(res => { //监听键盘高度变化
      this.setData({
        keyboardHeight: res.height
      });
      this.setChatListHeight();
      // this.scroll2Bottom();
    });
  },

  // 获得位置点留言信息
  getTalkList(campusId, poiId) {
    wx.request({
      url: 'http://116.62.20.146:9800/xydt_sys/getTalkList',
      data: {
        campusID: campusId,
        poiID: poiId
      },
      header: {
        'content-type':'application/json'
      },
      method: 'GET',
      success: (result)=>{
        if (result.data.length) {
          this.setData({
            msgList: result.data
          });
          app.globalData.msgList = result.data;
        }
      },
      fail: (err)=>{
        console.log(err);
      }
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
    let self = this;
    if (curMessage.trim() === "") {
      wx.showToast({
        title: '请输入聊天内容',
        duration: 2000,
        icon: "none"
      })
      return;
    }
    let messageList = this.data.msgList;
    let currentUser = app.globalData.userInfo;
    wx.request({
      url: 'http://116.62.20.146:9800/xydt_sys/saveTalk',
      data: {
        campusID: this.data.campusId,
        poiID: this.data.poiId,
        parentId: this.data.currentParent || this.data.poiId,
        msgImg: currentUser.avatarUrl,
        msgName: currentUser.nickName,
        msgDes: curMessage
      },
      header: {
        'content-type':'application/json'
      },
      method: 'POST',
      success: (result)=>{
        wx.showToast({
          title: '添加成功',
          success: function () {
            self.setData({
              focus: false
            })
            self.getTalkList(this.data.campusId, this.data.poiId)
          }
        });
      },
      fail: (err)=>{
        console.log(err);
      }
    });
    
    this.setData({
      isAnswer: false,
      curMessage:"",
      currentParent: '',
      msgList: messageList
    })
    app.globalData.msgList = this.data.msgList;
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
    let data = this.data.msgList;
    let currentParent;
    for(let i = 0; i < data.length; i++) {
      if (data[i].id == msg.id) {
        currentParent = msg.id;
        break;
      }
    }
    if (app.globalData.userInfo != null) {
      this.setData({
        placeholder: `回复${msg.msgName}`,
        focus: 'auto',
        isAnswer: true,
        currentParent: currentParent
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
          currentParent: currentParent
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