// app.js
App({
  globalData: {
    statusBarHeight: 0,
    screenHeight: 0,
    navBarHeight: 44,
    screenWidth:0,
  },
  onLaunch: function () {
    const windowInfo = wx.getWindowInfo()
    this.globalData.statusBarHeight = windowInfo.statusBarHeight
    this.globalData.screenHeight = windowInfo.screenHeight
    this.globalData.screenWidth = windowInfo.screenWidth

  }
})