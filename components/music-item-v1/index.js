// components/music-item-v1/index.js
import { playerMusicStore } from "../../store/index";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
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
    handleItemClick: function(e){
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/music-player/index?id=' + id,
      })
      // 对歌曲进行数据请求
      playerMusicStore.dispatch("playMusicSongs", {
        id
      })
    },
  }
})