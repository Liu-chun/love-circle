import {
  HYEventStore
} from "hy-event-store";
import {
  getLyric,
  getSongsDetail
} from "../service/api_player";
import {
  parseLyric
} from "../utils/lyricParse";
// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

const playerMusicStore = new HYEventStore({
  state: {
    id: 0,
    songsInfo: {}, // 歌曲信息
    lyricInfos: {}, // 歌词信息
    durationTime: 0, // 播放时长
    currentTime: 0, // 当前时长

    currentLyricIndex: 0, // 歌词进度
    currentLyric: "", // 当前播放歌词

    playModeIndex: 0, // 播放模式 0：循环 1：单曲 2：随机
    isPlaying: false, // 播放暂停

    songsMenus: [], // 歌单
    songsMenuIndex: [], // 歌单索引

    isFirst: true, // 是否为第一次播放
    isStoping: false, // 是否停止

  },
  actions: {
    playMusicSongs(ctx, {
      id,
      isRefresh = false
    }) {
      if (ctx.id === id && !isRefresh) return
      ctx.id = id
      // 播放
      ctx.isPlaying = true
      ctx.songsInfo = {}, // 歌曲信息
      ctx.lyricInfos = {}, // 歌词信息
      ctx.durationTime = 0, // 播放时长
      ctx.currentTime = 0, // 当前时长
      ctx.currentLyricIndex = 0, // 歌词进度
      ctx.currentLyric = "", // 当前播放歌词
      // 获取歌曲详情数据
      getSongsDetail(id).then(res => {
        const songsInfo = res.data.songs[0]
        const durationTime = res.data.songs[0].dt
        ctx.songsInfo = songsInfo
        ctx.durationTime = durationTime
        audioContext.title = ctx.songsInfo.name
      })
      // 获取歌词详情
      getLyric(id).then(res => {
        const SongLyric = res.data.lrc.lyric
        const lyricInfos = parseLyric(SongLyric)
        ctx.lyricInfos = lyricInfos
      })
      // 开始播放音乐
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.title = id
      // audioContext.autoplay = true
      // 监听歌曲播放
      if (ctx.isFirst) {
        this.dispatch("addListenerAudioContext")
        ctx.isFirst = false
      }
    },
    addListenerAudioContext(ctx) {
      // 歌曲准备完毕准备播放
      audioContext.onCanplay(() => {
        // audioContext.play()
      })
      // 监听歌曲播放进度
      audioContext.onTimeUpdate(() => {
        const currentTime = audioContext.currentTime * 1000
        ctx.currentTime = currentTime

        // 当前播放进度与播放歌词进行匹配
        var i = 0;
        for (i; i < ctx.lyricInfos.length; i++) {
          const item = ctx.lyricInfos[i];
          if (currentTime < item.time) {
            // const currentIndex = i - 1
            // if ( this.data.currentLyricIndex !== currentIndex ) {
            //   const currentLyric = this.data.lyricInfos[currentIndex]
            //   console.log(currentLyric.text);
            //   this.setData({ currentLyricIndex: currentIndex,currentLyric })
            // }
            break;
          }

        }
        // 歌词进度
        const currentIndex = i - 1 // 当前播放时长的上一局歌词
        if (ctx.currentLyricIndex !== currentIndex) {
          const currentLyric = ctx.lyricInfos[currentIndex]
          ctx.currentLyric = currentLyric
          ctx.currentLyricIndex = currentIndex
        }
      })
      // 监听歌曲是否播放完毕
      audioContext.onEnded(() => {
        this.dispatch("changeMusic")
      })
      // 监听音乐播放/暂停
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      // 是否停止
      // audioContext.onStop(() => {
      //   ctx.isPlaying = false
      //   ctx.isStoping = true
      // })
    },
    addListenerPlay(ctx) {
      ctx.isPlaying = !ctx.isPlaying
      // if (ctx.isPlaying && ctx.isStoping) {
      //   audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
      //   audioContext.title = ctx.songsInfo.name
      //   ctx.isStoping = false
      // }
      if (ctx.isPlaying) {
        audioContext.play()
      } else {
        audioContext.pause()
      }
    },
    changeMusic(ctx, isNext = true) {
      let index = ctx.songsMenuIndex
      switch (ctx.playModeIndex) {
        case 0:
          isNext ? index += 1 : index -= 1
          if (index === -1) {
            index = ctx.songsMenus.length - 1
          }
          if (index === ctx.songsMenus.length) index = 0
          break;
        case 1:
          break;
        case 2:
          index = Math.floor(Math.random() * ctx.songsMenus.length)
          break;
      }

      let currentSong = ctx.songsMenus[index]
      ctx.songsInfo = currentSong
      if (currentSong) {
        ctx.songsMenuIndex = index
      }
      this.dispatch("playMusicSongs", {
        id: ctx.songsInfo.id,
        isRefresh: true
      })
    },
  },
})

export {
  audioContext,
  playerMusicStore
}