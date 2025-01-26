const Path = require('path')
const Logger = require('../../Logger')

/**
 * @typedef SRTSegment
 * @property {number} id
 * @property {string} start
 * @property {string} end
 * @property {string} text
 */


/**
 * Parse metadata from epub
 *
 * @param {string} srtString
 * @returns {Promise<SRTSegment[]>}
 */
async function parseSRTString(srtString) {
  Logger.debug(`Parsing SRT string`)
  const payload = []
  const srtLines = srtString.split('\n')
  const segmentTemplate = {
    id: null,
    start: null,
    end: null,
    text: null
  }
  let segment = structuredClone(segmentTemplate)
  for (let i = 0; i < srtLines.length; i++) {
    let line = srtLines[i]
    if (i % 4 === 0) {
      segment['id'] = parseInt(line)
    }   else if (i % 4 === 1) {
      startEnd = line.split(' --> ')
      segment['start'] = startEnd[0]
      segment['end'] = startEnd[1]
    }   else if (i % 4 === 2) {
      segment['text'] = line
    } else if ( i % 4 === 3) {
      payload.push(segment)
      segment = structuredClone(segmentTemplate)
    }
  }

  return payload
}
module.exports.parseSRTString = parseSRTString
