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