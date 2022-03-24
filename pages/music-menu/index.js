// pages/music-menu/index.js
import {
  getPlayList
} from "../../service/api_music";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [],
    hotmMenuList: [],
    title: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    this.getPageData(0)
  },
  // 获取页面数据
  getPageData: async function (offect) {
    // 判断是否可以请求
    if (!this.data.menuList && offect !== 0) {
      return wx.showToast({
        title: '没有更多了~~~~',
        icon: 'loading',
        duration: 1500
      })
    }
    // 展示加载动画
    wx.showNavigationBarLoading()
    // 请求数据
    // 获取歌单列表
    var res = [];
    if (this.data.title === "推荐歌单") {
      res = await getPlayList("", 15, offect)
    } else if (this.data.title === "热门歌单") {
      res = await getPlayList("华语", 15, offect)
    }
    let newData = this.data.menuList
    if (offect === 0) {
      newData = res.data.playlists
    } else {
      newData = newData.concat(res.data.playlists)
    }
    this.setData({
      menuList: newData
    })
    wx.hideNavigationBarLoading()
    if (offect === 0) {
      wx.stopPullDownRefresh()
    }
  },


  handleItemClick: function (e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-music/index?id=${item.id}&type=menu`,
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
    this.getPageData(this.data.menuList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})