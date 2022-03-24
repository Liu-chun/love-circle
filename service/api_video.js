import cyRequest from "./index";

// 获取视频数据
export  function getTopMv(offset, limit = 10) {
  return cyRequest.get("top/mv", {
    offset,
    limit
  })
}

/**
 * @param {number} id 
 *  请求播放地址
 */
export  function getVideoUrl(id) {
  return cyRequest.get("mv/url", {
    id
  })
}
/**
 * @param {number} mvid 
 *  获取视频详情数据
 */

export  function getVideoDetail(mvid) {
  return cyRequest.get("mv/detail", {
    mvid
  })
}
/**
 * 请求相关视频
 * @param {number} id 
 */

export  function getRelatedVideo(id) {
  return cyRequest.get("related/allvideo", {
    id
  })
}