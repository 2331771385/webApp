
const app = getApp();

Page({
  data: {
    src: 'http://116.62.20.146:7788/img/banner-top.png',
    backgroundImg: 'http://116.62.20.146:7788/img/index-bottom.png',
    text: '山东大学是中国近代高等教育的起源性大学，其医学学科起源于1864年，开启近代中国高等医学教育之先河；其主体是1901年创办的山东大学堂，是继京师大学堂之后中国创办的第二所国立大学，也是中国第一所按章程办学的大学。学校规模宏大，实力雄厚，总占地面积8000余亩， 形成了一校三地（济南、威海、青岛）的办学格局。',
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    backgroundItem: [
      {
        id: 1,
        value: 'http://116.62.20.146:7788/img/SDUlogo.png',
      },
      {
        id: 2,
        value: 'http://116.62.20.146:7788/img/zhongxin1.png',
      }
    ],
    imgs1: [
      {
        id: 2,
        label: '洪家楼校区',
        value: 'http://116.62.20.146:7788/img/pic-honglou.jpg',
      },
      {
        id: 6,
        label: '软件园校区',
        value: 'http://116.62.20.146:7788/img/pic-ruanjian.jpg',
      },
      {
        id: 5,
        label: '兴隆山校区',
        value: 'http://116.62.20.146:7788/img/pic-xinglongshan.jpg',
      },
    ],
    imgs: [
      {
        id: 1,
        label: '中心校区',
        value: 'http://116.62.20.146:7788/img/pic-zhongxin.jpg',
      },
      {
        id: 4,
        label: '趵突泉校区',
        value: 'http://116.62.20.146:7788/img/pic-baotuquan.jpg'
      },
      {
        id: 3,
        label: '千佛山校区',
        value: 'http://116.62.20.146:7788/img/pic-qianfoshan.jpg'
      }
    ],
    imgs2: [
      {
        id: 7,
        label: '威海校区',
        value: 'http://116.62.20.146:7788/img/pic-weihai.jpg'
      },
      {
        id: 8,
        label: '青岛校区',
        value: 'http://116.62.20.146:7788/img/pic-qingdao.jpg'
      }
    ],
    currentPageUrl: ''
  },

  onLoad() {
    this.getSystemData(); // 获取统计数据
    this.getToken();
  },

  getSystemData() {
    let pages = getCurrentPages()    //获取加载的页面
    let currentPage = pages[pages.length-1]    //获取当前页面的对象
    let url = currentPage.route    //当前页面url
    this.setData({
      currentPageUrl: url
    });

    let params = {
      visiType: 1,
      urlContent: url,
      campusId: 0,
      poiId: 0
    }
    console.log(params);
    wx.request({
      url: 'http://192.168.0.109:8081/TbVisiLog/save',
      data: {
        visiType: 1,
        urlContent: url,
        campusId: 0,
        poiId: 0,
        campuName: '',
        poiName: ''
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result);
      },
      fail: ()=>{
        console.log('获取失败');
      }
    });
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
