import {
  getTopMv
} from "../../service/api_video"
// pages/home-video/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    hasMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(0)
  },
  // 获取视频数据
  // getData(page) {
  //   getTopMv(page).then(res => {
  //     console.log(res);
  //     this.setData({
  //       topMvs: res.data.data
  //     })
  //     wx.hideLoading()
  //   })
  // },
  // async await
  getData: async function (offect) {
    // 判断是否可以请求
    if (!this.data.hasMore && offect !== 0) {
      return wx.showToast({
        title: '没有更多了~~~~',
        icon: 'loading',
        duration: 1500
      })
    }
    // 展示加载动画
    wx.showNavigationBarLoading()
    // 请求数据
    const res = await getTopMv(offect)
    let newData = this.data.topMvs
    if (offect === 0) {
      newData = res.data.data
    } else {
      newData = newData.concat(res.data.data)
    }
    this.setData({
      topMvs: newData
    })
    this.setData({
      hasMore: res.data.hasMore
    })
    wx.hideNavigationBarLoading()
    if (offect === 0) {
      wx.stopPullDownRefresh()
    }
  },
  // 跳转详情页面
  handleItemClick: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id,
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
    this.getData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData(this.data.topMvs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})