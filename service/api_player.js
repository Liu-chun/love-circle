import cyRequest from "./index";

/**
 * 获取歌曲详情数据
 * @param {number} ids 
 */
export function getSongsDetail(ids) {
  return cyRequest.get('song/detail', {
    ids
  })
}
/**
 * 获取歌曲详情数据
 * @param {number} id
 */
export function getLyric(id) {
  return cyRequest.get('lyric', {
    id
  })
}
