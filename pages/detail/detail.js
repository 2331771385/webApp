const app = getApp();
Page({
  data: {
    campusId: '',
    campusName: '',
    backIcon: '../../img/back1.png',
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
        latitude: 36.675668
      },
      {
        id: 6,
        longitude: 117.143552,
        latitude: 36.666811
      },
      {
        id: 2,
        longitude: 117.068195,
        latitude: 36.687395
      },
      {
        id: 5,
        longitude: 117.028551,
        latitude: 36.651162
      },
      {
        id: 4,
        longitude: 117.050303,
        latitude: 36.601063
      },
      {
        id: 3,
        longitude: 117.018274,
        latitude: 36.652161
      },
      {
        id: 9,
        longitude: 117.454672,
        latitude: 36.685585
      },
      {
        id: 7,
        longitude: 120.688292,
        latitude: 36.365274
      },
      {
        id: 8,
        longitude: 122.058225,
        latitude: 37.532313
      }
    ],
    longitude: null, //经度
    latitude: null,
    picStudy: '../../img/study.png',
    picPath: '../../img/path.png'
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
      campusId:campusId,
      campusName:campusName
    });
    this.data.lngAndLatList.forEach(item => {
      if (item.id == campusId) {
        this.setData({
          longitude: item.longitude,
          latitude: item.latitude
        })
      }
    });
  },

  /**
   * 点击事件，返回上一页
   */
  gotoBack() {
    wx.navigateBack({
      delta: 1
    });
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
  }
})
