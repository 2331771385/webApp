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
    console.log(options);
    this.setData({
      campusId: campusId,
      keyWord: keyWord,
      campusName: campusName,
      url:`http://localhost:8081/goSchool.html?campusId=${campusId}&keyWord=${keyWord}&campusName=${campusName}`
    });
  },
})