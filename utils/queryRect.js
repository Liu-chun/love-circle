// 获取轮播图高度
export default function (selector) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    // query.selectViewport().scrollOffset()
    query.exec((res) => {
      resolve(res)
    })
  })
}