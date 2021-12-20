const app = getApp();
Page({
  data: {
    campusId: null,
    campusName: '',
    selectedPic: '', //页面跳转的连接，包含参数的拼接
    selectPicList: [
      {
        id: 1,
        picName: '../../common/img/dati_zhongxin3.jpg'
      },
      {
        id: 2,
        picName: '../../common/img/dati_hongjialou3.jpg'
      },
      {
        id: 3,
        picName: '../../common/img/dati_qianfoshan3.jpg'
      },
      {
        id: 4,
        picName: '../../common/img/dati_baotuquan3.jpg'
      },
      {
        id: 5,
        picName: '../../common/img/dati_xinglongshan3.jpg'
      },
      {
        id: 6,
        picName: '../../common/img/dati_ruanjianyuan3.jpg'
      },
      {
        id: 7,
        picName: '../../common/img/dati_weihai3.jpg'
      },
      {
        id: 8,
        picName: '../../common/img/dati_qingdao3.jpg'
      }
    ],
    backIcon: '../../common/img/left.png',
  },
  onLoad(options) {
    // let campusId = 1;

    let campusId = options.campusId;
    let campusName = options.campusName;
    console.log(campusName);
    let selectPicList = this.data.selectPicList;
    for(let i = 0; i < selectPicList.length; i++) {
      if (selectPicList[i].id == campusId) {
        this.setData({
          campusId: campusId,
          campusName: campusName,
          selectedPic: selectPicList[i].picName
        });
      }
    };
  },
  gotoBack() {
    let campusId = this.data.campusId;
    let campusName = this.data.campusName;
    wx.redirectTo({
      url: `/pages/out/out?campusId=${campusId}&campusName=${campusName}`
    })
  },
  goToMain() {
    wx.navigateTo({
      url: `/pages/schoolMain/schoolMain?campusId=${this.data.campusId}&campusName=${this.data.campusName}`
    })
  }
})