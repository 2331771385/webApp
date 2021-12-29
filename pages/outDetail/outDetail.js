var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const plugin = requirePlugin('WechatSI');
var qqmapsdk;
const app = getApp();
Page({
  data: {
    backIcon: 'http://116.62.20.146:7788/img/back1.png',
    locationData: {},
    pinUrls:[],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    msgList1: [],
    bottomOpt: [
      {
        id: 1,
        optImg: 'http://116.62.20.146:7788/img/share.png',
        optName: '分享',
        showPicture: true
      },
      {
        id: 2,
        optImg: 'http://116.62.20.146:7788/img/shoucang.png',
        optName: '收藏',
        showPicture: true
      },
      {
        id: 3,
        optImg: 'http://116.62.20.146:7788/img/edit.png',
        optName: '留言',
        showPicture: true
      },
      {
        id: 4,
        optImg: 'http://116.62.20.146:7788/img/shijing.png',
        optName: '全景',
        showPicture: true
      },
      {
        id: 5,
        optImg: 'http://116.62.20.146:7788/img/go.png',
        optName: '前往',
        showPicture: true
      }
    ],
    isClick: false, // 判断是否点击了收藏按钮
    job: [],
    jobList: [],
    id: '',
    jobStorage: [],
    jobId: '',
    line: 'http://116.62.20.146:7788/img/line.png',
    colleaps: 'http://116.62.20.146:7788/img/colleaps.png',
    isColleaps: 'http://116.62.20.146:7788/img/up.png',
    msgBox: false, // 控制软键盘的显示与隐藏

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
    currentParent: '',
    isPlaying: false,
    paly: '../../assets/play.png',
    pause: '../../assets/pause.png',
    campusList: [
      {
        id: 1,
        value: '中心校区'
      },
      {
        id: 2,
        value: '洪家楼校区'
      },
      {
        id: 3,
        value: '千佛山校区'
      },
      {
        id: 4,
        value: '趵突泉校区'
      },
      {
        id: 5,
        value: '兴隆山校区'
      },
      {
        id: 6,
        value: '软件园校区'
      },
      {
        id: 7,
        value: '威海校区'
      },
      {
        id: 8,
        value: '青岛校区'
      }
    ]
  },
  onShareAppMessage: function (res) {
    return {
      title: '分享该页面', // 自定义转发标题
      path: '/pages/outDetail/outDetail?current='+JSON.stringify(this.data.locationData), //当前页面的路径 ，必须是以 / 开头的完整路径
    }
  },
  onReady() {
    this.dialog = this.selectComponent('#dialog');
  },
  onLoad(options) {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    }) 
    this.setData({
      pinUrls: []
    });
    let self = this;
    let data = JSON.parse(options.current);

    // 进行建筑的统计
    this.getBuildData(data);

    this.getTalkList(data.campusID, data.PoiID);

    let syncData = wx.getStorageSync('jobData');
    for(let i = 0; i < syncData.length; i++) {
      if (syncData[i].content.PoiID == data.PoiID) {
        self.setData({
          isClick: true,
          'bottomOpt[1].optName': '已收藏',
          'bottomOpt[1].optImg': 'http://116.62.20.146:7788/img/mysc.png',
        })
        break;
      }
    }

    let pinUrls = this.data.pinUrls;
    let dataPinUrls = data.picUrls.split(';');
    for(var i = 0; i < dataPinUrls.length; i++) {
      let pic = `https://map.sdu.edu.cn${dataPinUrls[i]}`;
      pinUrls.push(pic);
    }

    // 控制实景的显示与隐藏
    let bottomOpt = this.data.bottomOpt;
    if (!data.pic720Url) {
      bottomOpt[3].showPicture = false;
    } else {
      bottomOpt[3].showPicture = true;
    };
    qqmapsdk = new QQMapWX({
      key: 'BPQBZ-XU3L6-B7RS3-MNX25-UZBV2-WDBVF'
    });
    wx.showLoading({
      title: '加载中'
    });
    //定位
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            var distance = self.distance(latitude, longitude,data.latitude,data.longitude);
            distance = distance + '公里';
            self.setData({
              distance: distance
            })
            wx.hideLoading();
          },
        });
      },
      fail(err) {
        wx.hideLoading({});
        wx.showToast({
          title: '定位失败',
          icon: 'none',
          duration: 1500
        })
      }
    });

    this.setChatListHeight();
    wx.onKeyboardHeightChange(res => { //监听键盘高度变化
      this.setData({
        keyboardHeight: res.height
      });
      this.setChatListHeight();
    });

    this.setData({
      locationData: data,
      pinUrls: pinUrls,
      autoplay: true,
      indicatorDots: true,
      bottomOpt: bottomOpt
    });   
  },

  getBuildData(currentBuild) {
    let pages = getCurrentPages()    //获取加载的页面
    let currentPage = pages[pages.length-1]    //获取当前页面的对象
    let url = currentPage.route    //当前页面url
    let Poitype = currentBuild.PoiType;
    let campusName = '';
    for(let i=0; i<this.data.campusList.length; i++) {
      if (this.data.campusList[i].id == currentBuild.campusID) {
        campusName = this.data.campusList[i].value;
      }
    }
    let visiType;
    if (Poitype == 1) {
      visiType = 3;
    } else if (Poitype == 2) {
      visiType = 4;
    } else if (Poitype == 5) {
      visiType = 5
    }
    wx.request({
      url: 'http://192.168.0.109:8081/TbVisiLog/save',
      data: {
        visiType: visiType,
        urlContent: url,
        campusId: currentBuild.campusID,
        poiId: currentBuild.PoiID,
        campusName: campusName,
        poiName: currentBuild.PoiName
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result);
      },
      fail: ()=>{
        console.log('获取失败');
      }
    });
  },

  // 文字转语音
  wordYun:function (e) {
    var that = this;
    var content = this.data.locationData.detailDescribe;
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function (res) {
        that.setData({
          src: res.filename
        })
        that.yuyinPlay();
 
      },
      fail: function (res) {
        console.log("fail tts", res)
      }
    })
  },

  //播放语音
  yuyinPlay: function (e) {
    let isPlay = this.data.isPlaying;
    if (this.data.src == '') {
      return;
    }
    this.innerAudioContext.src = this.data.src //设置音频地址
    this.innerAudioContext.play(); //播放音频
    this.setData({
      isPlaying: !isPlay
    })
  },
 
  // 结束语音
  end: function (e) {
    this.innerAudioContext.pause();//暂停音频
    let isPlay = this.data.isPlaying;
    this.setData({
      isPlaying: !isPlay
    })
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
        console.log(result.data);
        if (result.data.length) {
          this.setData({
            msgList1: result.data
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
    });
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
    let currentData = this.data.locationData;
    let self = this;
    if (curMessage.trim() === "") {
      wx.showToast({
        title: '请输入聊天内容',
        duration: 2000,
        icon: "none"
      })
      return;
    }
    let messageList = this.data.msgList1;
    let currentUser = app.globalData.userInfo;
    wx.request({
      url: 'http://116.62.20.146:9800/xydt_sys/saveTalk',
      data: {
        campusID: currentData.campusID,
        poiID: currentData.PoiID,
        parentId: this.data.currentParent || currentData.PoiID,
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
            self.getTalkList(currentData.campusID, currentData.PoiID)
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
      msgList1: messageList
    });
    app.globalData.msgList = this.data.msgList1;
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
      msgList1: app.globalData.msgList
    });
  }, 


  // 计算两点之间的距离
  distance(la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(1);
    return s;
  },

  // 跳转到上一个页面中
  gotoBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 跳转到所有的留言界面
  gotoAllMsg() {
    let poiName = this.data.locationData.PoiName;
    let campusId = this.data.locationData.campusID;
    let poiId = this.data.locationData.PoiID;
    wx.navigateTo({
      url: `/pages/allMsgPage/allMsgPage?poiName=${poiName}&campusId=${campusId}&poiId=${poiId}`
    })
  },

  //点击详情页中的每一项，跳转到具体的页面
  goToDetailPage(item) {
    let self = this;
    let index = item.currentTarget.dataset.set.id;
    if (index == 1) {
      // 进行分享

    } else if (index == 2) {
      //收藏
      let selectedData = this.data.bottomOpt;
      for(let i = 0; i < selectedData.length; i++) {
        if (selectedData[i].id == index) {
          if (selectedData[i].optName == '收藏') {
            self.setData({
              'bottomOpt[1].optName': '已收藏',
              'bottomOpt[1].optImg': 'http://116.62.20.146:7788/img/mysc.png'
            })
          } else {
            self.setData({
              'bottomOpt[1].optName': '收藏',
              'bottomOpt[1].optImg': 'http://116.62.20.146:7788/img/shoucang.png'
            })
          }
          break;
        }
      }
      this.haveSave();
    } else if (index == 3) {
      //留言
      this.showDialog();

    } else if (index == 4) {
      //实景
      this.showAllPicture();
      
    } else if (index == 5) {
      //前往,跳转到路径规划页面
      this.getPlanRouter();
    }
  },

  // 收藏功能
  haveSave(e) {
    if (!this.data.isClick == true) {
      let jobData = app.globalData.jobList;
      // let jobData = wx.getStorageSync('jobData');
      jobData.push({
        jobId: jobData.length,
        id: this.data.job.id,
        content: this.data.locationData
      });
      wx.setStorageSync('jobData', jobData);//设置缓存
      wx.showToast({
        title: '已收藏',
      })
    } else {
      wx.showToast({
        title: '取消收藏'
      });
      let data = wx.getStorageSync('jobData');
      for(let i = 0; i < data.length; i++) {
        if (data[i].content.PoiID == this.data.locationData.PoiID) {
          data.splice(i,1);
        }
      }
      app.globalData.jobList = data;
      wx.setStorageSync('jobData', data);
    }
    this.setData({
      isClick: !this.data.isClick
    });
  },


  // 街景图片
  showAllPicture() {
    let data = this.data.locationData;
    wx.navigateTo({
      url: `/pages/allPicture/allPicture?campusId=${data.campusID}&keyWord=${data.PoiName}`
    })
  },

  // 路径规划页面
  getPlanRouter() {
    let endPoint = this.data.locationData.PoiName;
    let lat = this.data.locationData.latitude;
    let lng = this.data.locationData.longitude;
    wx.navigateTo({
      url: `/pages/goRouter/goRouter?endPoint=${endPoint}&lat=${lat}&lng=${lng}`

      // url: `/pages/planRouter/planRouter?endPoint=${endPoint}&lat=${lat}&lng=${lng}`
    })
  },

  async showDialog() {
    let self = this;
    if (app.globalData.userInfo != null) {
      self.setData({
        msgBox: true,
        placeholder: '留下属于你的精彩评论吧',
      });
      return;
    }
    wx.getUserProfile({
      desc: '必须授权成功后才能进行留言',
      success(res) {
        self.setData({
          msgBox: true,
          placeholder: '留下属于你的精彩评论吧',
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

  hideInput() {
    let msgBox = this.data.msgBox;
    if (msgBox) {
      this.setData({
        msgBox: false,
        focus: false
      })
    }
  },

  getAnswer(e) {
    let msg = e.currentTarget.dataset.set;
    let self = this;
    let data = this.data.msgList1;
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
        msgBox: true,
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
          msgBox: true,
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

})
