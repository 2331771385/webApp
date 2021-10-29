const app = getApp();
Page({
  data: {
    keyWord: '',
    campusId: '',
    campusName: '',
    backIcon: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/back1.png',
    toolBarList: [
      {
        id: 0,
        text: '建筑类型'
      },
      {
        id: 1,
        text: '所有建筑'
      },
      {
        id: 100,
        text: '学校校门'
      },
      {
        id: 101,
        text: '教学楼'
      },
      {
        id: 102,
        text: '办公楼'
      },
      {
        id: 103,
        text: '图书馆'
      },
      {
        id: 104,
        text: '科研实验'
      },
      {
        id: 105,
        text: '宿舍公寓'
      },
      {
        id: 106,
        text: '食堂餐厅'
      },
      {
        id: 107,
        text: '运动场馆'
      },
      {
        id: 108,
        text: '医院救助'
      },
      {
        id: 109,
        text: '停车场'
      },
      {
        id: 111,
        text: '喷泉雕塑'
      },
      {
        id: 110,
        text: '家属住宅'
      },
      {
        id: 199,
        text: '其它建筑'
      }
    ],
    colleageList: [
      {
        id: 0,
        text: '单位类型'
      },
      {
        id: 2,
        text: '所有单位'
      },
      {
        id: 201,
        text: '教学学院'
      },
      {
        id: 202,
        text: '党群机构'
      },
      {
        id: 203,
        text: '职能部门'
      },
      {
        id: 204,
        text: '科研机构'
      },
      {
        id: 205,
        text: '附属单位'
      },
      {
        id: 299,
        text: '其它机构'
      }
    ],
    publicList: [
      {
        id: 0,
        text: '服务类型'
      },
      {
        id: 5,
        text: '所有服务'
      },
      {
        id: 501,
        text: '购物超市'
      },
      {
        id: 502,
        text: '咖啡书店'
      },
      {
        id: 503,
        text: 'ATM银行'
      },
      {
        id: 504,
        text: '校园卡'
      },
      {
        id: 505,
        text: '打字复印'
      },
      {
        id: 506,
        text: '邮寄快递'
      },
      {
        id: 507,
        text: '澡堂理发'
      },
      {
        id: 508,
        text: '手机电子'
      },
      {
        id: 599,
        text: '其它服务'
      }
    ],
    lngAndLatList: [
      {
        id: 1,
        longitude: 117.060109, // 经度
        latitude: 36.675668,
        markerImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/3d-zhongxin3.png'
      },
      {
        id: 6,
        longitude: 117.143552,
        latitude: 36.666811,
        markerImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/3d-software.png'
      },
      {
        id: 2,
        longitude: 117.068195,
        latitude: 36.687395,
        markerImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/3d-hongjialou1.png'
      },
      {
        id: 5,
        longitude: 117.028551,
        latitude: 36.651162,
        markerImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/3d-qianfoshan3.png'
      },
      {
        id: 4,
        longitude: 117.050303,
        latitude: 36.601063,
        markerImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/3d-xinglongshan.png'
      },
      {
        id: 3,
        longitude: 117.018274,
        latitude: 36.652161,
        markerImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/3d-baotuquan3.png'
      },
      {
        id: 9,
        longitude: 117.454672,
        latitude: 36.685585
      },
      {
        id: 7,
        longitude: 120.688292,
        latitude: 36.365274,
        markerImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/3d-qingdao3.png'
      },
      {
        id: 8,
        longitude: 122.058225,
        latitude: 37.532313,
        markerImg: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/3d-weihai5.png'
      }
    ],
    detailShow: true,
    token: '',
    markers: [],
    longitude: null, //经度
    latitude: null,
    picStudy: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/study.png',
    picPath: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/path.png',
    dataList: [], // 调用接口返回的所有的数组
    // isClick: false,
    // shoucang: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/myShoucang.png',
    // notShouCang: 'cloud://cloud1-3g64wm0l14fa1f42.636c-cloud1-3g64wm0l14fa1f42-1306847170/img/shoucang.png',
    // jobStorage: [],
    // job: [],
  },
  /**
   * 
   * @param {*} options 
   * 页面跳转传递的参数可以从onload方法的options里面获取
   * 拿到参数之后可以使用this.setData()方法将参数放在方法里面
   * 以便后面的方法可以用到这个属性
   */
  onLoad(options) {
    let campusId = options.campusId;
    let campusName = options.campusName;
    this.setData({
      campusId: campusId,
      campusName: campusName
    });
    this.data.lngAndLatList.forEach(item => {
      if (item.id == campusId) {
        this.setData({
          longitude: item.longitude,
          latitude: item.latitude,
        })
      }
    });

    /**
     * 页面加载的时候，就显示迎新的景点
     */
    this.getStudentJd();
  },

  getStudentJd(){
    wx.request({
      url: 'https://map.sdu.edu.cn/poi/getCampusPoiList',
      data: {
        token: app.globalData.token,
        ID: this.data.campusId,
        poiType: 4
      },
      header: {
        'content-type':'application/json'
      },
      method: 'GET',
      success: (result)=>{
        /**
         * 在这里可以拿到接口中的数据
         * 可以显示在页面上
         */
        
        // console.log(result);
      },
      fail: (err)=>{
        console.log(err);
      },
      complete: ()=>{}
    });
  },

  /**
 * 当前位置点的收藏功能
 * 参考地址：https://www.jb51.net/article/141878.htm
 */
  haveSave(e) {
    if (!this.data.isClick == true) {
      let jobData = this.data.jobStorage;
      jobData.push({
        jobId: jobData.length,
        id: this.data.job.id
      });
      wx.setStorageSync('jobData', jobData);//设置缓存
      wx.showToast({
        title: '已收藏',
      })
    } else {
      wx.showToast({
        title: '取消收藏'
      })
    }
    this.setData({
      isClick: !this.data.isClick
    })
  },

  /**
   * 点击事件，返回上一页
   */
  gotoBack() {
    // wx.navigateBack({
    //   delta: 1
    // });
    wx.navigateTo({
      url: 'map'
    })
  },

  /**
   * 点击标记点的时候触发
   */
  markerTap(e) {
    console.log('点击标记点', e);
  },

  /**
   * 点击label的时候触发
   */
  labeltap(e) {
    console.log('点击label的时候', e);
  },

  /**
   * 监听输入框中输入的数据
   */
  inputKey(e) {
    this.setData({
      keyWord: e.detail.value
    })
  },

  /**
   * 对输入的内容进行搜索
   */
  getSearchResult() {
    this.setData({
      token: app.globalData.token
    })
    var reqTask = wx.request({
      url: 'https://map.sdu.edu.cn/poi/getCampusPoiList',
      data: {
        token: this.data.token,
        ID: this.data.campusId,
        keyWord: this.data.keyWord
      },
      header: {
        'content-type':'application/json'
      },
      method: 'GET',
      success: (result)=>{
        /**
         * 在这里可以拿到接口中的数据
         * 可以显示在页面上
         */
        if (result.statusCode == 200) {
          this.setData({
            dataList: result.data.racs
          });
          result.data.racs.forEach(item => {
            this.setData({
              markers:{
                longitude: item.longitude,
                latitude: item.latitude,
                callout: {
                  content: item.PoiName
                }
              }
            })
          })
        }
      },
      fail: (err)=>{
        console.log(err);
      },
      complete: ()=>{}
    });
  },

  /**
   * 点击首页中的详情跳转到详情页
   * 跳转到buildDetail
   */
   detailPage(){
    wx.navigateTo({
      url: '/pages/buildDetail/buildDetail'
    })
   }
})
