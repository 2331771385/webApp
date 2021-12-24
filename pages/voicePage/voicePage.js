//index.js
const app = getApp(), myAudio = require("../../utils/audioManager");
 
Page({
  data: {
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
  onLoad: function () {
    //模拟从服务器获取数据
    setTimeout(()=>{
      let audio={
        src:'https://antuyou.oss-cn-shenzhen.aliyuncs.com/audio/mp3/1348937282342129665/1610446683055-ty5xxn1h.mp3',
        title:'比翼的羽根',
        coverImgUrl:'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1905199713.jpg'
      };
      this.setData({
        audio
      })
      this.initBackGroundAudio();
    },2000);
  },
  //初始化音频
  initBackGroundAudio() {
    if (!this.data.audio.src) {
      return
    }
    let audio = {//设置播放器属性，src与title为必填
      src: this.data.audio.src,
      title: this.data.audio.title,
      coverImgUrl: this.data.audio.coverImgUrl
    };
    myAudio.init(audio, this);//初始化audio
    myAudio.getDuration(audio, this);//获取视频长度
    myAudio.pause();//暂停播放
  },
  dragAudioSlider(e) {//拖动进度条
    myAudio.seek({
      progress: e.detail.value
    }, this)//跳转到该进度
    myAudio.play(this);//播放
  },
  //自定义音频播放器
  sliderChange(e) {
    myAudio.seek({
      progress: e.detail.value
    }, this)//跳转到该进度
    myAudio.play(this);//播放
  },
  //播放按钮
  playAudio() {
    if (this.data.backgroundAudio.isPlaying) {
      myAudio.pause(this);
    } else {
      myAudio.play(this);
    }
  },
  onUnload(){
    myAudio.uninstall(this);//卸载播放器，重置播放器数据
  }
})