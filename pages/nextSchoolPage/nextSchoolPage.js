const app = getApp();
Page({
  data: {
    campusId: null,
    campusName: '',
    selectedPic: 'http://116.62.20.146:7788/img/main_bg_g.jpg', //页面跳转的连接，包含参数的拼接
    backIcon: 'http://116.62.20.146:7788/img/left.png',
    mainText: 'http://116.62.20.146:7788/img/main2.png',
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
    firstNotice: '1.低风险地区需提供绿色健康码，中高风险地区需提供7日核酸检测阴性证明。',
    secondNotice: '2.新生报到时需携带的材料：',
    secondText: '录取通知书、高考准考证、有效身份证件',
    secondText1: '、一寸正面免冠彩色照片8张、考生档案、党团组织关系介绍信。',
    thirdNotice: '3.因特殊情况不能按时报到者，必须事先以书面形式向山东大学招生办公室请假，请假时间不得超过两周，报到时需携带相关证明销假.',
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
          selectedPicTitle: picList[i].picName
        });
        break;
      }
    }
    this.setData({
      campusId: campusId,
      campusName: campusName
    });
  },
  gotoBack() {
    wx.redirectTo({
      url: `/pages/schoolMain/schoolMain?campusId=${this.data.campusId}&campusName=${this.data.campusName}`
    })
  },
  goToMain() {
    wx.redirectTo({
      url: `/pages/schoolPoint/schoolPoint?campusId=${this.data.campusId}&campusName=${this.data.campusName}`
    })
  }
})