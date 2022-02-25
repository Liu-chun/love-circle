// pages/detail-video/index.js
import {
  getVideoDetail,
  getVideoUrl,
  getRelatedVideo
} from "../../service/api_video.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvUrl: {},
    mvDetail: {},
    relatedList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.getData(id)
  },


  getData: function (id) {
    // 获取视频详情数据
    getVideoDetail(id).then(res => {
      this.setData({
        mvDetail: res.data.data
      })
    })
    // 获取视频播放地址
    getVideoUrl(id).then(res => {
      this.setData({
        mvUrl: res.data.data
      })

    })
    // 获取相关视频数据
    getRelatedVideo(id).then(res => {
      this.setData({
        relatedList: res.data.data
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