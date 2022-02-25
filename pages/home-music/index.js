// pages/home-music/index.js
import {
  rankingStore
} from "../../store/index";
import {
  getBanner,
  getPlayList
} from "../../service/api_music";
import queryRect from "../../utils/queryRect";
import throttle from "../../utils/throttle";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [], // 轮播图
    recommend: [], // 推荐歌曲
    menuList: [], //歌单列表
    hotmMenuList: [], //歌单列表
    rankings: {
      0: {},
      2: {},
      3: {}
    },
    swipperHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取页面数据
    this.getData()
    // 获取共享数据
    rankingStore.dispatch("getRankingsData")

    rankingStore.onState("hotRanking", (res) => {
      if (res.tracks) {
        const data = res.tracks.slice(0, 6)
        this.setData({
          recommend: data
        })
      }
    })

    rankingStore.onState("newRanking", this.getRankingHandle(0))
    rankingStore.onState("originRanking", this.getRankingHandle(2))
    rankingStore.onState("upRanking", this.getRankingHandle(3))

  },
  getRankingHandle: function (idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const tracks = res.tracks.slice(0, 3)
      const rankingObj = {
        name,
        coverImgUrl,
        tracks,
        playCount
      }
      const newRankings = {
        ...this.data.rankings,
        [idx]: rankingObj
      }
      this.setData({
        rankings: newRankings
      })

    }
  },
  // 搜索
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },
  getData: function () {
    // 获取轮播图
    getBanner().then(res => {
      this.setData({
        banners: res.data.banners
      })
    })
    // 获取歌单列表
    getPlayList().then(res => {
      this.setData({
        menuList: res.data.playlists
      })
    })
    getPlayList("华语").then(res => {
      // console.log(res.data);
      this.setData({
        hotmMenuList: res.data.playlists
      })
    })
  },

  // 获取图片高度
  handleImageLoad: throttle(function () {
    this.getSwipperHeight()
  }),
  getSwipperHeight() {
    queryRect(".swipper-image").then(res => {
      const rect = res[0]
      this.setData({
        swipperHeight: rect.height
      })
    })
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