// components/song-menu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuList: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemClick: function (e) {
      const item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/detail-music/index?id=${item.id}&type=menu`,
      })
    },
    handleMoreClick: function (e) {
      // console.log(e);
      const title = e.currentTarget.dataset.title
      wx.navigateTo({
        url: `/pages/music-menu/index?title=${title}`,
      })
    },
  }
})