const app = getApp();
Page({
  data: {
    campusId: null,
    campusName: '',
    selectedPic: '../../common/img/main_bg.jpg', //页面跳转的连接，包含参数的拼接
    backIcon: '../../common/img/left.png',
    mainText: '../../common/img/2.png',
    point: '../../common/img/point.png',
    imgList: [
      {
        id: 1,
        picName: '../../common/img/logo_zhongxin.png'
      },
      {
        id: 2,
        picName: '../../common/img/logo_hongjialou.png'
      },
      {
        id: 3,
        picName: '../../common/img/logo_qianfoshan.png'
      },
      {
        id: 4,
        picName: '../../common/img/logo_baotuquan.png'
      },
      {
        id: 5,
        picName: '../../common/img/logo_xinglongshan.png'
      },
      {
        id: 6,
        picName: '../../common/img/logo_ruanjianyuan.png'
      },
      {
        id: 7,
        picName: '../../common/img/logo_weihai.png'
      },
      {
        id: 8,
        picName: '../../common/img/logo_qingdao.png'
      }
    ],
    selectedPicTitle: '',
    baseText: '学校按照院系住宿远近，已提前设置好报到地点。团橘已帮你整理好了，快来看看你在哪里报到吧！'
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
    wx.navigateTo({
      url: `/pages/nextSchoolPage/nextSchoolPage?campusId=${this.data.campusId}&campusName=${this.data.campusName}`
    })
  },
  goToMain() {
    wx.navigateTo({
      url: `/pages/goSchoolPage/goSchoolPage?campusId=${this.data.campusId}&keyWord=报到&campusName=${this.data.campusName}`
    })
  }
})