const app = getApp();
Page({
  data: {
    url: '', //页面跳转的连接，包含参数的拼接
  },
  onLoad(options) {
    let url;
    if (options.opt == 'copyPage') {
      url = 'https://www.sdu.edu.cn/sdgk/sdjj.htm';
    } else if (options.opt == 'detailPage') {
      url = 'https://www.sdu.edu.cn/';
    }
    this.setData({
      url: url
    });
  },
})
