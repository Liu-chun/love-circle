import {
  audioContext,
  playerMusicStore
} from "../../store/index.js";

const playModeNames = ["order","repeat","random"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", // 歌曲id
    songsInfo: {}, // 歌曲信息
    lyricInfos: {}, // 歌词信息
    songsMenus: [], // 歌单
    currentPage: 0, // 当前页面
    containerHeight: 0, // 高度
    currentLyricIndex: 0, // 当前播放歌词行
    durationTime: 0, // 歌曲总时长
    currentTime: 0, // 当前播放时长
    sliderVal: 0, // 进度条
    isSliderchanging: false, // 是否拖拽
    aspectRatio: 0, // 宽高比
    currentLyric: "", // 当前播放歌词
    lyricScroll: 0, // 歌词滚动高度
    playModeIndex: 0, // 当前播放模式索引
    playModeName: "order", // 当前播放模式
    isPlaying: false, // 播放暂停
    playingName: "resume",
    show: false ,// 弹出层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取id
    const id = options.id
    this.setData({
      id
    })

    // 获取内容高度
    const {
      statusBarHeight,
      screenHeight,
      navBarHeight,
      screenWidth
    } = getApp().globalData
    const containerHeight = screenHeight - statusBarHeight - navBarHeight
    // 获取宽高比
    const aspectRatio = screenHeight / screenWidth

    this.setData({
      containerHeight,
      aspectRatio
    })

    // 监听歌曲页面数据
    this.addListenPlayMusicStore()

  },
  // 轮播
  changeCurrentPage: function (e) {
    const currentPage = e.currentTarget.dataset.index
    this.setData({
      currentPage
    })
  },

  // 轮播事件
  handleChange: function (e) {
    if (!e.detail.source === "touch") return
    this.setData({
      currentPage: e.detail.current
    })
  },

  // 进度条点击事件
  handleChangeSlider: function (e) {
    const value = e.detail.value
    const currentTime = this.data.durationTime * value / 100

    // 设置 currentTime点击到的进度
    // audioContext.pause()
    audioContext.seek(currentTime / 1000)
    this.setData({
      currentTime,
      isSliderchanging: false
    })
  },
  // 进度条拖拽事件
  handleChangingSlider: function (e) {
    const value = e.detail.value
    const currentTime = this.data.durationTime * value / 100
    this.setData({
      currentTime,
      isSliderchanging: true
    })
  },
  // 切换播放模式
  handleChangeMode: function(){
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3) playModeIndex = 0
    playerMusicStore.setState("playModeIndex", playModeIndex )
  },
  // 播放暂停
  handleChangePlay: function(){
    playerMusicStore.dispatch("addListenerPlay")
  },
  // 上一首
  handlePrevClick: function(){
    playerMusicStore.dispatch("changeMusic", false)
  },
  // 下一首
  handleNextClick: function(){
    playerMusicStore.dispatch("changeMusic")
  },

  // 数据监听
  addListenPlayMusicStore: function () {
    // 监听songsInfo,durationTime,lyricInfos
    playerMusicStore.onStates(["songsInfo", "durationTime", "lyricInfos"], ({songsInfo,durationTime,lyricInfos}) => {
      if(songsInfo) this.setData({songsInfo})
      if(durationTime) this.setData({durationTime})
      if(lyricInfos) this.setData({lyricInfos})
    })
    // 监听currentTime,currentLyricIndex,currentLyric
    playerMusicStore.onStates(["currentTime","currentLyricIndex","currentLyric"],({currentTime,currentLyricIndex,currentLyric})=>{
      // 时间变化
      if(currentTime && !this.data.isSliderchanging){
        const sliderVal = currentTime / this.data.durationTime * 100
        this.setData({ currentTime ,sliderVal })
      }
      // 歌词变化
      if(currentLyricIndex){
        this.setData({ currentLyricIndex,lyricScroll: currentLyricIndex * 35 })
      }
      if(currentLyric){
        this.setData({ currentLyric })
      }
    })
    // 监听播放相关的数据
    playerMusicStore.onStates(["playModeIndex","isPlaying"],({playModeIndex,isPlaying})=>{
      if(playModeIndex !== undefined){
        this.setData({ playModeIndex, playModeName:playModeNames[playModeIndex] })
      }
      if(isPlaying !== undefined){
        this.setData({ isPlaying, playingName: isPlaying ? "pause" : "resume" })
      }
    })
    // 监听歌单 
    playerMusicStore.onState("songsMenus",( songsMenus )=>{

      this.setData({ songsMenus })
    })
  },

  //  
  handleShowClick: function(){
    this.setData({ show: !this.data.show })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})