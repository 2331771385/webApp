var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp();
Page({
  data: {
    storeAddress:'',
    addListShow: false,
    regionData: {}, 
    currentRegion: {
      province: '选择城市',
      city: '选择城市',
      district: '选择城市',
    },
    latitude: '',
    longitude: '',
    centerData: {},
    nearList: [],
    suggestion: [],
    selectedId: 0,
    keyword: '我的位置',
    backIcon: 'http://116.62.20.146:7788/img/back1.png',
    locationData: '',
    lat: null,
    lng: null,
    pathSort: [
      {
        id: 0,
        text: '步行路线'
      },
      {
        id: 1,
        text: '骑行路线'
      },
      {
        id: 2,
        text: '驾车路线'
      }
    ],
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
        const speed = res.speed
        const accuracy = res.accuracy
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
              currentRegion: res.result.address_component,
              markers: [{
                id: 0,
                latitude: latitude,
                longitude: longitude,
                width: 32,
                height:32,
                iconPath: 'http://116.62.20.146:7788/img/iconqidian.png',
              }]
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
            self.getSearchPath();
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
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
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

  /**
   * 路径规划方案
   * @param {} data 
   */
   getSearchPath: function() {
     this.setData({
       selectedId: this.selectComponent('#selectedItem').data.idx
     })
     let url;
     let index = this.data.selectedId;
     if (index == 0) {
       url = 'https://apis.map.qq.com/ws/direction/v1/walking/';
     } else if (index == 1) {
       url = 'https://apis.map.qq.com/ws/direction/v1/bicycling/';
     } else if (index == 2) {
       url = 'https://apis.map.qq.com/ws/direction/v1/driving/'
     }
     let startLat = this.data.latitude; // 起点的经纬度
     let startLng = this.data.longitude;
     let endLat = this.data.lat; // 终点的经纬度
     let endLng = this.data.lng;
     let now_location = String(startLat + ',' + startLng);
     let end_location = String(endLat + ',' + endLng);
     var markers = this.data.markers;
     if (markers.length == 2) {
       markers.pop();
     }
     markers.push({
       id: 1,
       latitude: endLat,
       longitude: endLng,
       width: 32,
       height: 32,
       iconPath: 'http://116.62.20.146:7788/img/zhongdian.png'
      //  iconPath: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/zhongdian.png'
     })
     let _this = this;
     wx.request({
       url: url,
       data: {
         from: now_location,
         to: end_location,
         key: 'BPQBZ-XU3L6-B7RS3-MNX25-UZBV2-WDBVF'
       },
       header: {
         'content-type':'application/json'
        },
       method: 'GET',
       dataType: 'json',
       responseType: 'text',
       success: (result)=>{
         let polyline = result.data.result.routes[0].polyline;
         for(var i = 2; i < polyline.length; i++) {
          polyline[i] = polyline[i-2] + polyline[i]/1000000
         }
         let b = [];
         for(var i = 0; i < polyline.length; i = i+2) {
           b[i/2] = {latitude: polyline[i],longitude:polyline[i+1]}
         }
         _this.setData({
           polyline:[{
             points:b,
             color: '#295bfa',
             width: 4,
             dottedLine: false
           }],
           scale: '16',
           markers: markers
         });
       },
       fail: ()=>{},
       complete: ()=>{}
     });
   },
  
  // 根据关键词搜索附近位置
  nearby_search: function (e) {
    var self = this;
    wx.hideLoading();
    // wx.showLoading({
    //   title: '加载中'
    // });
    // 调用接口
    qqmapsdk.search({
      keyword: e.detail.value,  //搜索关键词
      success: function (res) { //搜索成功后的回调
        let response = res.data && res.data[0];
        const latitude = response.location.lat;
        const longitude = response.location.lng;
        
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            let markers = self.data.markers;
            markers.shift();
            markers.unshift({
              id: 0,
              latitude: latitude,
              longitude: longitude,
              width: 32,
              height:32,
              iconPath: 'http://116.62.20.146:7788/img/iconqidian.png'
            })
            self.setData({
              latitude: latitude,
              longitude: longitude,
              markers: markers
            })
            // 调用接口
            wx.hideLoading();
            self.getSearchPath();
          },
        });
      },
      fail: function (res) {
        //console.log(res);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },
  //根据关键词搜索匹配位置
  getsuggest: function (e) {
    var _this = this;
    var keyword = e.detail.value;
    _this.setData({
      addListShow: true
    })
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: keyword, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      location: _this.data.latitude + ',' + _this.data.longitude,
      page_size: 20,
      page_index: 1,
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        //console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            province: res.data[i].province,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          nearList: sug,
          keyword: keyword
        });
      },
      fail: function (error) {
        //console.error(error);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  }
})
