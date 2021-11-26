const app = getApp();
Page({
  data: {
    // backIcon: '../../img/back1.png',
    backIcon: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/back1.png',
    locationData: {},
    pinUrls:[],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    msgList: [
      {
        id: 1,
        // msgImg: '../../img/zs.png', // 留言者的微信头像
        msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/zs.png', // 留言者的微信头像
        msgName: '张三', //留言者的名称
        msgDes: '地理位置优越，景色优美。', //留言描述
        msgTimer: '2021-10-28 17:00'
      },
      {
        id: 2,
        // msgImg: '../../img/ls.png', // 留言者的微信头像
        msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/ls.png', // 留言者的微信头像
        msgName: '李四', //留言者的名称
        msgDes: '打卡，景色秀丽。', //留言描述
        msgTimer: '2021-10-26 12:15'
      },
      {
        id: 3,
        // msgImg: '../../img/wxh.png', // 留言者的微信头像
        msgImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/wxh.png', // 留言者的微信头像
        msgName: '王小华', //留言者的名称
        msgDes: '校门还是那么大气，赞！', //留言描述
        msgTimer: '2021-10-25 16:35'
      }
    ],
    msgList1: [],
    bottomOpt: [
      {
        id: 1,
        // optImg: '../../img/share.png',
        optImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/share.png',
        optName: '分享',
        showPicture: true
      },
      {
        id: 2,
        // optImg: '../../img/shoucang.png',
        optImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/shoucang.png',
        optName: '收藏',
        showPicture: true
      },
      {
        id: 3,
        // optImg: '../../img/edit.png',
        optImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/edit.png',
        optName: '留言',
        showPicture: true
      },
      {
        id: 4,
        // optImg: '../../img/shijing.png',
        optImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/shijing.png',
        optName: '全景',
        showPicture: true
      },
      {
        id: 5,
        // optImg: '../../img/go.png',
        optImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/go.png',
        optName: '前往',
        showPicture: true
      }
    ]
  },
  
  onReady() {
    this.dialog = this.selectComponent('#dialog');
  },
  onLoad(options) {
    this.setData({
      pinUrls: []
    })
    let data = JSON.parse(options.current);
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
    this.setData({
      locationData: data,
      msgList1: this.data.msgList.slice(0,2),
      pinUrls: pinUrls,
      autoplay: true,
      indicatorDots: true,
      bottomOpt: bottomOpt
    });
    
  },

  // 跳转到上一个页面中
  gotoBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 跳转到所有的留言界面
  gotoAllMsg() {
    
  },

  //点击详情页中的每一项，跳转到具体的页面
  goToDetailPage(item) {
    let index = item.currentTarget.dataset.set.id;
    if (index == 1) {
      // 进行分享
    } else if (index == 2) {
      //收藏

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
      url: `/pages/planRouter/planRouter?endPoint=${endPoint}&lat=${lat}&lng=${lng}`
    })
  },

  showDialog() {
    this.dialog.showPopup();
  },

  // 点击取消的时候
  _error() {
    this.dialog.hidePopup();
  },
  //确认事件
  _success() {
    this.dialog.hidePopup();
  }
})
