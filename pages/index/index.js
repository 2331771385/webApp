// index.js    js文件存放的是页面逻辑
// 获取应用实例
const app = getApp();
Page({
  data: {
    src: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/banner-top.png',
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
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/SDUlogo.png'
      },
      {
        id: 2,
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/zhongxin1.png'
      }
    ],
    imgs1: [
      {
        id: 2,
        label: '洪家楼校区',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-honglou.jpg'
      },
      {
        id: 6,
        label: '软件园校区',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-ruanjian.jpg'
      },
      {
        id: 4,
        label: '兴隆山校区',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-xinglongshan.jpg'
      },
    ],
    imgs: [
      {
        id: 1,
        label: '中心校区',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-zhongxin.jpg'
      },
      {
        id: 3,
        label: '趵突泉校区',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-baotuquan.jpg'
      },
      {
        id: 5,
        label: '千佛山校区',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-qianfoshan.jpg'
      }
    ],
    imgs2: [
      {
        id: 8,
        label: '威海校区',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-weihai.jpg'
      },
      {
        id: 7,
        label: '青岛校区',
        value: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/pic-qingdao.jpg'
      }
    ]
  },

  onLoad() {
    /**
     * 在页面初始化的时候，获得页面中的token
     * 并且将token存储在localStorage中
     */
    this.getToken();
  },

  /**
   * 获得页面中的token
   */
  getToken() {
    var reqTask = wx.request({
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
      url: '/pages/out/out'
    })
  },
  gotoDetail() {
    wx.navigateTo({
      url: '/pages/outDetail/outDetail'
    })
  },
  goToOtherDetail(e){
    let item = e.currentTarget.dataset.set; // 得到当前点击的对象
    // wx.navigateTo({
    //   url: `/pages/detail/detail?campusId=${item.id}&campusName=${item.label}`
    // })
    wx.navigateTo({
      url: `/pages/out/out?campusId=${item.id}&campusName=${item.label}`
    })
  }
})
