// pages/detail-music/index.js
import {
  rankingStore
} from "../../store/index";

import {
  getSongDetail
} from "../../service/api_music";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingName: "",
    rankingsObj: {},
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type

    this.setData({
      rankingName: options.rankingName
    })
    this.setData({
      type: type
    })
    if (type === "rank") {
      rankingStore.onState(options.rankingName, this.getItemData)
    } else if (type === "menu") {
      const id = options.id
      getSongDetail(id).then(res => {
        this.setData({rankingsObj: res.data.playlist})
      })
    }
  },

  getItemData: function (res) {
    this.setData({
      rankingsObj: res
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