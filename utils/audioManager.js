//audioManager.js
//2019年8月15日09:52:09
// 实现的功能
//1.进入后获取音频时长； 2.播放暂停 3.进度条自动滚动，播放时间自动增加 4.在播放时拖动进度条后可跳转播放 5.播放完成后进度条归零并暂停
 
//bug&tip
//1.由于微信API wx.getBackgroundAudioManager();创建的背景音频对象在设置src后不能立刻pause();
//  所以获取duration时使用了 wx.createInnerAudioContext();
//  在用户点击播放按钮时才创建背景音频
//2.使用时，请按照微信官方文档，在app.json中配置支持背景播放的以下字段
//  "requiredBackgroundModes":["audio"]
 
 
//获取全局背景音乐管理器
const manager = wx.getBackgroundAudioManager();
//存储当前播放歌曲信息
let audioData = {
  src: '',
  title: '',
  singer: '',
  epname: '',
  coverImgUrl: '',
  webUrl: '',
  duration: 0,
  startTime: 0
};
let audioInterval;
//是否需要重置数据
let resetAudio = true;
const init = (e, t) => {//初始化播放器
  if (!e.src || !e.title) {
    return;
  }
  audioData.src = e.src || '';
  audioData.title = e.title || '';
  audioData.singer = e.singer || '';
  audioData.epname = e.epname || '';
  audioData.coverImgUrl = audioData.coverImgUrl || '';
  audioData.webUrl = e.webUrl || '';
  audioData.startTime = e.startTime || 0;
  resetAudio = true;
}
 
const createAudio = (e, t) => {//创建音频播放
  if (!e.src) {
    alert('没有音频地址')
    return;
  }
  setAudio(e, t);
  clearInterval(audioInterval);
  audioInterval = setInterval(() => {
    let backgroundAudio = t.data.backgroundAudio;
    backgroundAudio.isPlaying = !manager.paused;
    t.setData({
      backgroundAudio
    })
    if (!manager.paused) {
      let e = {
        currentTime: manager.currentTime
      }
      changeAudioProgressBar(e, t);
    }
  }, 1000);
  manager.onError((err) => {
    console.log('播放错误');
    console.log(err);
  })
  manager.onEnded(() => {//播放完成
    resetAudio = true;
    changeAudioProgressBar({ progress: 0 }, t);
    pause(t);
  })
}
 
 
const getDuration = (e, t) => {//获取音频总时长
  if (!e.src) {
    return;
  }
  const innerAudioContext = wx.createInnerAudioContext();//用于获取duration
  innerAudioContext.src = e.src;//设置src
  innerAudioContext.play();//播放一次以获取音频信息
  innerAudioContext.pause();//暂停
  innerAudioContext.onCanplay(() => {
    var durationInterval = setInterval(() => {
      if (innerAudioContext.duration) {
        audioData.duration = innerAudioContext.duration;
        let backgroundAudio = t.data.backgroundAudio;
        backgroundAudio.duration = innerAudioContext.duration;
        var min = parseInt(innerAudioContext.duration / 60), sec = parseInt(innerAudioContext.duration % 60);
        //小程序无法使用padstart，采用以下方式补全时间格式
        if (min.toString().length == 1) {
          min = `0${min}`;
        } else {
          min = `${min}`
        }
        if (sec.toString().length == 1) {
          sec = `0${sec}`;
        } else {
          sec = `${sec}`
        }
        backgroundAudio.durationTime = `${min}:${sec}`;
        t.setData({
          backgroundAudio
        })
        clearInterval(durationInterval);
      }
    }, 500)
  })
}
 
const seek = (e, t) => {//跳转到该进度播放
  if (!(e.currentTime || e.progress || e.currentTime == 0 || e.progress == 0)) {
    console.log('没有参数，无法跳转');
    return;
  }
  if (resetAudio) {
    if (e.currentTime || e.currentTime == 0) {
      audioData.startTime = e.currentTime;
    } else {
      audioData.startTime = parseInt(e.progress * audioData.duration / 100)
    }
  } else {
    if (e.currentTime || e.currentTime == 0) {
      manager.seek(parseInt(e.currentTime));
    } else {
      manager.seek(parseInt(e.progress * manager.duration / 100));
    }
    if (!manager.paused) {
      play(t);
    } else {
      pause(t);
    }
  }
}
 
const changeAudioProgressBar = (e, t) => {//修改进度条等显示用的信息
  if (!(e.currentTime || e.progress || e.currentTime == 0 || e.progress == 0)) {
    console.log('没有参数，无法设置进度条');
    return;
  }
  let duration, durationTime, currentDuration, currentDurationTime, progress;
  duration = manager.duration;
  if (e.currentTime || e.currentTime == 0) {
    currentDuration = e.currentTime;
    progress = parseInt(100 * currentDuration / duration);
  } else {
    progress = e.progress;
    currentDuration = parseInt(progress * duration / 100);
  }
  let timeArr = [parseInt(duration / 60), parseInt(duration % 60), parseInt(currentDuration / 60), parseInt(currentDuration % 60)];
  for (let i in timeArr) {
    //小程序无法使用padstart，采用以下方式补全时间格式
    if (timeArr[i].toString().length == 1) {
      timeArr[i] = `0${timeArr[i]}`
    } else {
      timeArr[i] = `${timeArr[i]}`
    }
  }
  currentDurationTime = `${timeArr[2]}:${timeArr[3]}`;
  let backgroundAudio = t.data.backgroundAudio;
  backgroundAudio.currentDuration = currentDuration;
  backgroundAudio.currentDurationTime = currentDurationTime;
  backgroundAudio.progress = progress;
  t.setData({ backgroundAudio })
  return backgroundAudio;
}
 
 
const play = (t) => {//播放
  if (resetAudio) {
    let e = {
      src: audioData.src,
      title: audioData.title,
      startTime: audioData.startTime
    }
    createAudio(e, t);
  }
  manager.play();
  if (t) {
    let backgroundAudio = t.data.backgroundAudio;
    backgroundAudio.isPlaying = true;
    t.setData({
      backgroundAudio
    })
  }
}
const pause = (t) => {//暂停
  manager.pause();
  if (t) {
    let backgroundAudio = t.data.backgroundAudio;
    backgroundAudio.isPlaying = false;
    t.setData({
      backgroundAudio
    })
  }
}
const stop = (t) => {//结束
  manager.stop();
  if (t) {
    let backgroundAudio = t.data.backgroundAudio;
    backgroundAudio.isPlaying = false;
    t.setData({
      backgroundAudio
    })
  }
}
const uninstall = (t) => {
  stop();//停止播放
  clearInterval(audioInterval);//清除计时器
  audioData = {//重置数据
    src: '',
    title: '',
    singer: '',
    epname: '',
    coverImgUrl: '',
    webUrl: ''
  };
  resetAudio = true;
}
 
const setAudio = (e, t) => {//设置播放器数据
  if (!e.src) {
    alert('没有音频地址')
    return;
  }
  console.log('setAudio的信息');
  console.log(e);
  manager.src = e.src;
  manager.title = e.title;
  manager.startTime = e.startTime;
  manager.epname = e.epname || '';
  manager.singer = e.singer || '';
  manager.coverImgUrl = e.coverImgUrl || '';
  manager.webUrl = e.webUrl || '';
  //将音频数据暂存
  audioData.src = e.src;
  audioData.title = e.title;
  audioData.epname = e.epname || '';
  audioData.singer = e.singer || '';
  audioData.coverImgUrl = e.coverImgUrl || '';
  audioData.webUrl = e.webUrl || '';
  audioData.startTime = 0;
  resetAudio = false;
  pause(t);
}
 
const hideAudio = (t) => {//切换到背景播放，暂时没用到
 
}
const showAudio = (t) => {//切换到前台播放，暂时没用到
  if (!manager.currentTime || !manager.duration) {
    return;
  }
}
 
 
 
const alert = (e) => {//提示
  wx.showToast({
    title: e,
    icon: 'none',
    mask: true
  })
}
module.exports = {
  init,
  getDuration,
  play,
  pause,
  stop,
  seek,
  hideAudio,
  showAudio,
  uninstall
}