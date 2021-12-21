var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp();
Page({
  data: {
    storeAddress:'',
    addListShow: false,
    regionData: {}, 
    latitude: '',
    longitude: '',
    centerData: {},
    nearList: [],
    suggestion: [],
    selectedId: 0,
    keyword: '我的位置',
    backIcon: 'http://116.62.20.146:7788/img/back1.png',
    distance: '',
    lat: null,
    lng: null,
    locationData: '',
    
    selectedIndex: null,
    polyline: [], //路径规划的线
    markers: [],
    scale: '17'
  },
  onLoad: function (options) {
    let endPoint = options.endPoint;
    let lat = options.lat;
    let lng = options.lng;
    // let endPoint = '4号宿舍楼';
    // let lat = 36.667508;
    // let lng = 117.142782;
    let self =this;
    this.setData({
      locationData: endPoint,
      lat: lat,
      lng: lng
    });
    self.mapCtx = wx.createMapContext('myMap')
    // 实例化API核心类
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
        //你地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            self.setData({
              latitude: latitude,
              longitude: longitude,
              markers: [
                {
                  id: 0,
                  latitude: latitude,
                  longitude: longitude,
                  width: 32,
                  height:32,
                  iconPath: 'http://116.62.20.146:7788/img/iconqidian.png',
                },
                {
                  id: 1,
                  latitude: lat,
                  longitude: lng,
                  width: 32,
                  height: 32,
                  iconPath: 'http://116.62.20.146:7788/img/zhongdian.png'
                }
              ]
            });
            self.mapCtx.includePoints({
              padding: [40, 20, 40, 20],
              points: [
                {
                  latitude: latitude,
                  longitude: longitude
                },
                {
                  latitude: lat,
                  longitude: lng
                }
              ]
            });
            // 调用接口
            wx.hideLoading();
            let distanceTo = self.distance(latitude, longitude, lat, lng);
            
            self.setData({
              distance: distanceTo
            })
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
    
  },
  
  //重新定位
  reload: function () {
    this.onLoad();
  },

  // 跳转到上一个页面中
  gotoBack: function() {
    wx.navigateBack({
      delta: 1
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

  toBus() {
    let plugin = requirePlugin('routePlan');
    let key = 'BPQBZ-XU3L6-B7RS3-MNX25-UZBV2-WDBVF';  //使用在腾讯位置服务申请的key
    let referer = 'test';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': this.data.locationData,
      'latitude': this.data.lat,
      'longitude': this.data.lng
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
    });
  }
})
