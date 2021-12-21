const app = getApp();
Page({
  data: {
    campusId: null,
    campusName: '',
    selectedPic: 'http://116.62.20.146:7788/img/main_bg.jpg', //页面跳转的连接，包含参数的拼接
    backIcon: 'http://116.62.20.146:7788/img/left.png',
    mainText: 'http://116.62.20.146:7788/img/2.png',
    point: 'http://116.62.20.146:7788/img/point.png',
    imgList: [
      {
        id: 1,
        picName: 'http://116.62.20.146:7788/img/logo_zhongxin.png'
      },
      {
        id: 2,
        picName: 'http://116.62.20.146:7788/img/logo_hongjialou.png'
      },
      {
        id: 3,
        picName: 'http://116.62.20.146:7788/img/logo_qianfoshan.png'
      },
      {
        id: 4,
        picName: 'http://116.62.20.146:7788/img/logo_baotuquan.png'
      },
      {
        id: 5,
        picName: 'http://116.62.20.146:7788/img/logo_xinglongshan.png'
      },
      {
        id: 6,
        picName: 'http://116.62.20.146:7788/img/logo_ruanjianyuan.png'
      },
      {
        id: 7,
        picName: 'http://116.62.20.146:7788/img/logo_weihai.png'
      },
      {
        id: 8,
        picName: 'http://116.62.20.146:7788/img/logo_qingdao.png'
      }
    ],
    selectedPicTitle: '',
    baseText: '新主人你好！我是山大的“神兽”——小团橘。今天团橘会陪你度过奇妙的开学之旅，了解报道地点和超精彩的大学生活，快跟上团橘的步伐吧！'
  },
  onLoad(options) {
    // let campusId = 1;

    let campusId = options.campusId;
    let campusName = options.campusName;
    let picList = this.data.imgList;
    for(let i = 0; i < picList.length; i++) {
      if (picList[i].id == campusId) {
        this.setData({
          selectedPicTitle: picList[i].picName,
          campusName: campusName
        });
        break;
      }
    }
    this.setData({
      campusId: campusId
    });
  },
  gotoBack() {
    wx.redirectTo({
      url: `/pages/schoolPage/schoolPage?campusId=${this.data.campusId}&campusName=${this.data.campusName}`
    })
  },
  goToMain() {
    wx.redirectTo({
      url: `/pages/nextSchoolPage/nextSchoolPage?campusId=${this.data.campusId}&campusName=${this.data.campusName}`
    })
  }
})