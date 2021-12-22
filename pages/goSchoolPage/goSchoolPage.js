const app = getApp();
Page({
  data: {
    campusId: null,
    campusName: '',
    keyWord: '',
    url: '', //页面跳转的连接，包含参数的拼接
  },
  onLoad(options) {
    let campusId = options.campusId;
    let keyWord = options.keyWord;
    let campusName = options.campusName;
    this.setData({
      campusId: campusId,
      keyWord: keyWord,
      campusName: campusName,
      url:`http://116.62.20.146:7788/makeMap/goSchool.html?campusId=${campusId}&keyWord=${keyWord}&campusName=${campusName}`
      // url:`http://localhost:8081/goSchool.html?campusId=${campusId}&keyWord=${keyWord}&campusName=${campusName}`
    });
  },
})