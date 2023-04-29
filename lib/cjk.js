/**
 * 言語コードの略称を返す関数「cjk」を定義
 * 
 */

const BLOG = require('../blog.config')

function cjk() {
  switch (BLOG.lang.toLowerCase()) {
    case 'ja':
      case 'ja-jp':
        return 'JP'
    case 'zh-cn':
    case 'zh-sg':
      return 'SC'
    case 'zh':
    case 'zh-hk':
    case 'zh-tw':
      return 'TC'
    case 'ko':
    case 'ko-kr':
      return 'KR'
    default:
      return null
  }
}

module.exports = cjk
