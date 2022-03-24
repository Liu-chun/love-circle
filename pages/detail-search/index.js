// pages/detail-search/index.js
import {
  getSeachHot,
  getSeachSuggest,
  getSeachResult
} from "../../service/api_music";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotSearchList: [],
    searchVal: "",
    suggestSongs: [],
    suggestNodes: [],
    resultSongs: [],
    offset: 0,
    hasMore: true,
    timer: null // 防抖, 用的定时器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
  },
  // 获取页面数据
  getPageData: function () {
    // 获取搜索热门
    getSeachHot().then(res => {
      this.setData({
        hotSearchList: res.data.result.hots
      })
    })
  },
  // 搜索
  handleSearch: function (e) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getSeachSuggest(e)
    }, 500)
  },
  // 搜索请求
  getSeachSuggest: function (e) {
    // const searchVal = e.detail || e.keyword
    const searchVal = e.detail
    this.setData({
      searchVal
    })
    if (!searchVal.length) {
      this.setData({
        suggestSongs: [],
        resultSongs: []
      })
      return
    }
    getSeachSuggest(searchVal).then(res => {
      const suggestSongs = res.data.result.allMatch
      this.setData({
        suggestSongs
      })
      if (suggestSongs == undefined) return
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestNodes = []
      // startsWith() 是否以 xxx 开头
      for (const keyword of suggestKeywords) {
        const nodes = []
        if (keyword.startsWith(searchVal)) {
          const key1 = keyword.slice(0, searchVal.length)
          const node1 = {
            name: 'span',
            attrs: {
              style: 'color: red;'
            },
            children: [{
              type: 'text',
              text: key1
            }]
          }
          nodes.push(node1)
          const key2 = keyword.slice(searchVal.length)
          const node2 = {
            name: 'span',
            attrs: {
              style: 'color: #000;'
            },
            children: [{
              type: 'text',
              text: key2
            }]
          }
          nodes.push(node2)
        } else {
          const node = {
            name: 'span',
            attrs: {
              style: 'color: #000;'
            },
            children: [{
              type: 'text',
              text: keyword
            }]
          }
          nodes.push(node)
        }
        suggestNodes.push(nodes)
      }
      this.setData({
        suggestNodes
      })
    })

  },
  // 确定搜索
  getSeachResult: function (searchVal, offset) {
    if (!this.data.hasMore && this.data.resultSongs.length) {
      return wx.showToast({
        title: '没有更多了~~~~',
        icon: 'loading',
        duration: 1000
      })
    }
    // 展示加载动画
    wx.showNavigationBarLoading()
    // 请求数据
    getSeachResult(searchVal, offset).then(res => {
      console.log(res);
      const resultSongs = res.data.result.songs
      this.setData({
        resultSongs: this.data.resultSongs.concat(resultSongs)
      })
      this.setData({
        hasMore: res.data.result.hasMore
      })
      wx.hideNavigationBarLoading()
    })
  },
  handleSearchOk: function () {
    const searchVal = this.data.searchVal
    this.getSeachResult(searchVal)
  },
  handleItemClick: function (e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({
      searchVal: keyword
    })
    this.getSeachResult(keyword)
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
    this.getSeachResult(this.data.searchVal, this.data.resultSongs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})