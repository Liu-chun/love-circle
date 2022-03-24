export function parseLyric(lyric) {
  var lyricPatt = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  var lyrics = lyric.split("\n")
  var lyricInfos = []
  for (const item of lyrics) {
    const lyricsRegExp = lyricPatt.exec(item)
    if (!lyricsRegExp) continue
    // 获取时间
    const minute = lyricsRegExp[1] * 60 * 1000
    const second = lyricsRegExp[2] * 1000
    const millsecond = lyricsRegExp[3].length === 2 ? lyricsRegExp[3] * 10 : lyricsRegExp[3] * 0
    const time = minute + second + millsecond
    // 获取歌词
    const text = item.replace(lyricPatt, "")
    lyricInfos.push({
      time,
      text
    })
  }
  return lyricInfos
}