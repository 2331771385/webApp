// index.js    js文件存放的是页面逻辑
// 获取应用实例
const app = getApp();

Page({
  data: {
    // src: '../../img/banner-top.png',
    src: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/banner-top.png',
    // backgroundImg: '../../img/index-bottom.png',
    backgroundImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/index-bottom.png',
    text: '山东大学是中国近代高等教育的起源性大学，其医学学科起源于1864年，开启近代中国高等医学教育之先河；其主体是1901年创办的山东大学堂，是继京师大学堂之后中国创办的第二所国立大学，也是中国第一所按章程办学的大学。学校规模宏大，实力雄厚，总占地面积8000余亩， 形成了一校三地（济南、威海、青岛）的办学格局。',
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    backgroundItem: [
      {
        id: 1,
        // value: '../../img/SDUlogo.png',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/SDUlogo.png'
      },
      {
        id: 2,
        // value: '../../img/zhongxin1.png',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/zhongxin1.png'
      }
    ],
    imgs1: [
      {
        id: 2,
        label: '洪家楼校区',
        // value: '../../img/pic-honglou.jpg',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-honglou.jpg'
      },
      {
        id: 6,
        label: '软件园校区',
        // value: '../../img/pic-ruanjian.jpg',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-ruanjian.jpg'
      },
      {
        id: 5,
        label: '兴隆山校区',
        // value: '../img/pic-xinglongshan.jpg',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-xinglongshan.jpg'
      },
    ],
    imgs: [
      {
        id: 1,
        label: '中心校区',
        // value: '../../img/pic-zhongxin.jpg',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-zhongxin.jpg'
      },
      {
        id: 4,
        label: '趵突泉校区',
        // value: '../../img/pic-baotuquan.jpg'
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-baotuquan.jpg'
      },
      {
        id: 3,
        label: '千佛山校区',
        // value: '../../img/pic-qianfoshan.jpg'
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-qianfoshan.jpg'
      }
    ],
    imgs2: [
      {
        id: 8,
        label: '威海校区',
        // value: '../../img/pic-weihai.jpg'
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-weihai.jpg'
      },
      {
        id: 7,
        label: '青岛校区',
        // value: '../../img/pic-qingdao.jpg'
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-qingdao.jpg'
      }
    ]
  },

  onLoad() {
    this.getToken();

    let self = this;
    // 获取微信登录者的头像和用户名
    self.isAuthorize().then(res => {
      // 获取头像昵称
      wx.getUserInfo({
        withCredentials: true,
        success: (result) => {
          app.globalData.userInfo = result.userInfo; // 用户的头像以及用户名
        }
      });
    }).catch(err => {
      console.log('获取用户微信失败');
    })
  },

  /**
   * 是否授权获取头像和昵称，
   * 已经授权返回then
   * 没有授权返回catch
   */
   isAuthorize() {
    return new Promise((resolve, reject) => {
      // 获取用户信息
      wx.getSetting({
        success: (result) => {
          if (result.authSetting['scope.userInfo']) {
            resolve();
          } else {
            reject();
          }
          // if (!result.authSetting['scope.record']) {
          //   wx.authorize({
          //     scope: 'scope.record',
          //     success () {
          //       // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          //       wx.startRecord()
          //     }
          //   })
          // }
        },
        fail: () => {
          console.log('失败');
        }
      });
    })
  },

   

  /**
   * 获得页面中的token
   */
  getToken() {
    wx.request({
      url: 'https://map.sdu.edu.cn/campus/m_generateToken',
      data: {},
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        // 请求成功的token
        if (result.data) {
          app.globalData.token = result.data.msg;
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  goToSDU() {
    wx.navigateTo({
      url: '/pages/copyAndDetail/copyAndDetail?opt=copyPage'
    })
  },
  gotoDetail() {
    wx.navigateTo({
      url: '/pages/copyAndDetail/copyAndDetail?opt=detailPage'
    })
  },
  goToOtherDetail(e){
    let item = e.currentTarget.dataset.set; // 得到当前点击的对象
    wx.navigateTo({
      url: `/pages/out/out?campusId=${item.id}&campusName=${item.label}`
    })
  }
})
