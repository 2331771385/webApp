// //index.js
// const app = getApp(), myAudio = require("../../utils/audioManager");
 
// Page({
//   data: {
//     audio:{//用来存储服务器传输过来的内容
//       src:'',
//       title:'',
//       coverImgUrl:''
//     },
//     paly: '../../assets/play.png',
//     pause: '../../assets/pause.png',
//     backgroundAudio: {//实际正在播放的内容，必须配置在data中
//       image: "",
//       url: "",
//       name: "",
//       duration: "",
//       durationTime: "",
//       currentDuration: "",
//       currentDurationTime: "",
//       progress: "",
//       isPlaying: false
//     }
//   },
//   onLoad: function () {
//     //模拟从服务器获取数据
//     setTimeout(()=>{
//       let audio={
//         src:'https://antuyou.oss-cn-shenzhen.aliyuncs.com/audio/mp3/1348937282342129665/1610446683055-ty5xxn1h.mp3',
//         title:'比翼的羽根',
//         coverImgUrl:'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1905199713.jpg'
//       };
//       this.setData({
//         audio
//       })
//       this.initBackGroundAudio();
//     },2000);
//   },
//   //初始化音频
//   initBackGroundAudio() {
//     if (!this.data.audio.src) {
//       return
//     }
//     let audio = {//设置播放器属性，src与title为必填
//       src: this.data.audio.src,
//       title: this.data.audio.title,
//       coverImgUrl: this.data.audio.coverImgUrl
//     };
//     myAudio.init(audio, this);//初始化audio
//     myAudio.getDuration(audio, this);//获取视频长度
//     myAudio.pause();//暂停播放
//   },
//   dragAudioSlider(e) {//拖动进度条
//     myAudio.seek({
//       progress: e.detail.value
//     }, this)//跳转到该进度
//     myAudio.play(this);//播放
//   },
//   //自定义音频播放器
//   sliderChange(e) {
//     myAudio.seek({
//       progress: e.detail.value
//     }, this)//跳转到该进度
//     myAudio.play(this);//播放
//   },
  //播放按钮
  // playAudio() {
  //   if (this.data.backgroundAudio.isPlaying) {
  //     myAudio.pause(this);
  //   } else {
  //     myAudio.play(this);
  //   }
  // },
//   onUnload(){
//     myAudio.uninstall(this);//卸载播放器，重置播放器数据
//   }
// })


const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
 
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    content: '金坛天气真好，哈哈哈哈哈哈哈，地点不错',//内容
    src:'', //
    audio:{//用来存储服务器传输过来的内容
      src:'',
      title:'',
      coverImgUrl:''
    },
    paly: '../../assets/play.png',
    pause: '../../assets/pause.png',
    backgroundAudio: {//实际正在播放的内容，必须配置在data中
      image: "",
      url: "",
      name: "",
      duration: "",
      durationTime: "",
      currentDuration: "",
      currentDurationTime: "",
      progress: "",
      isPlaying: false
    }
  },
  onReady(e) {
    //创建内部 audio 上下文 InnerAudioContext 对象。
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    }) 
  },
  
  // 文字转语音
  wordYun:function (e) {
    var that = this;
    var content = this.data.content;
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function (res) {
        console.log(res);
        that.setData({
          src: res.filename
        })
        that.yuyinPlay();
 
      },
      fail: function (res) {
        console.log("fail tts", res)
      }
    })
  },
  
  //播放语音
  yuyinPlay: function (e) {
    console.log('走到了这一步');
    console.log(this.innerAudioContext);
    if (this.data.src == '') {
      console.log(暂无语音);
      return;
    }
    this.innerAudioContext.src = this.data.src //设置音频地址
    this.innerAudioContext.play(); //播放音频
  },
 
  // 结束语音
  end: function (e) {
    this.innerAudioContext.pause();//暂停音频
  },
  
})