var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
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
    ],
    isClick: false, // 判断是否点击了收藏按钮
    job: [],
    jobList: [],
    id: '',
    jobStorage: [],
    jobId: '',
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
    this.setData({
      pinUrls: []
    });
    let self = this;
    let data = JSON.parse(options.current);

    let syncData = wx.getStorageSync('jobData');
    for(let i = 0; i < syncData.length; i++) {
      if (syncData[i].content.PoiID == data.PoiID) {
        self.setData({
          isClick: true,
          'bottomOpt[1].optName': '已收藏',
          'bottomOpt[1].optImg': 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/mysc.png'
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
        
        //逆地址解析
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

    this.setData({
      locationData: data,
      msgList1: app.globalData.msgList.slice(0,2),
      pinUrls: pinUrls,
      autoplay: true,
      indicatorDots: true,
      bottomOpt: bottomOpt
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
    wx.navigateTo({
      url: `/pages/allMsgPage/allMsgPage?poiName=${poiName}`
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
              'bottomOpt[1].optImg': 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/mysc.png'
            })
          } else {
            self.setData({
              'bottomOpt[1].optName': '收藏',
              'bottomOpt[1].optImg': 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/shoucang.png'
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
