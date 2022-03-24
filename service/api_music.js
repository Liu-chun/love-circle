import cyRequest from "./index";

/**
 * 获取轮播图数据
 * @param {number} type 
 */
// 
export function getBanner(type) {
  return cyRequest.get("banner", {
    type: 2
  })
}
/**
 * 获取歌曲排行数据
 * @param {number} idx 
 */
export function getRankings(idx) {
  return cyRequest.get("top/list", {
    idx,
  })
}
/**
 * 获取歌单列表
 * @param {string} cat 
 * @param {number} limit 
 * @param {number} offset 
 */
export function getPlayList(cat = "全部", limit = 6, offset = 0) {
  return cyRequest.get("top/playlist", {
    cat,
    limit,
    offset,
  })
}
/**
 * 获取歌单详情
 * @param {number} id []
 */
export function getSongDetail(id) {
  return cyRequest.get("playlist/detail/dynamic", {
    id
  })
}
/**
 * 获取热门搜索
 * 
 */
export function getSeachHot() {
  return cyRequest.get("search/hot")
}
/**
 * 搜索建议
 * 
 */
export function getSeachSuggest(keywords, type = "mobile") {
  return cyRequest.get("search/suggest", {
    keywords,
    type,
  })
}
/**
 * 搜索
 * 
 */
export function getSeachResult(keywords, offset = 0) {
  return cyRequest.get("search", {
    keywords,
    offset
  })
}