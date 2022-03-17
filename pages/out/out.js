const app = getApp();
Page({
  data: {
    campusId: null,
    campusName: '',
    url: '', //页面跳转的连接，包含参数的拼接
  },
  onLoad(options) {
    let campusId = options.campusId;
    let campusName = options.campusName;
    this.setData({
      campusId: campusId,
      campusName: campusName,
      url: `http://116.62.20.146:7788/makeMap/ttt.html?campusId=${campusId}&campusName=${campusName}`
    });

    // let pages = getCurrentPages()    //获取加载的页面
    // let currentPage = pages[pages.length-1]    //获取当前页面的对象
    // let routerUrl = currentPage.route    //当前页面url
  },
})