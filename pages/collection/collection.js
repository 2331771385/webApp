var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp();

Page({
  data: {
    job: [],
    backIcon: 'http://116.62.20.146:7788/img/back1.png',
  },
  onLoad(options) {
    let self = this;
    let savejob = wx.getStorageSync('jobData');
    if (savejob.length) {
      qqmapsdk = new QQMapWX({
        key: 'BPQBZ-XU3L6-B7RS3-MNX25-UZBV2-WDBVF'
      });
      wx.showLoading({
        title: '加载中'
      });
      for(let i = 0; i < savejob.length; i++) {
        let pic = savejob[i].content.picurls.split(';')[0];
        pic = `http://116.62.20.146:8081${pic}`;
        savejob[i].pic = pic;

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
                var distance = self.distance(latitude, longitude,savejob[i].content.latitude,savejob[i].content.longitude);
                savejob[i].distance = distance + '公里';
                self.setData({
                  job: savejob
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
      };
    } else {
      wx.showToast({
        title: '暂无收藏数据!'
      })
    }
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

  gotoBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 跳转到详情页
  goToDetail(e) {
    let selectedData = e.currentTarget.dataset.set.content;
    wx.navigateTo({
      url: '/pages/outDetail/outDetail?current='+JSON.stringify(selectedData)
    });
  },
})