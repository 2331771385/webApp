const app = getApp();
Page({
  data: {
    campusID: '',
    keyWord: '',
    url: '', //页面跳转的连接，包含参数的拼接
  },
  onLoad(options) {
    this.setData({
      campusID: options.campusId,
      keyWord: options.keyWord,
      url: `http://116.62.20.146:7788/makeMap/allPicture.html?campusId=${options.campusId}&keyWord=${options.keyWord}`
      // url: `http://localhost:8081/allPicture.html?campusId=${options.campusId}&keyWord=${options.keyWord}`
    })
  },
})
