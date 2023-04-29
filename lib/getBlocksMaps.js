import BLOG from '@/blog.config'

// ConfigページAPIから2つのフォームの内容を取得し、2つのjsonに加工してhtmlrewrite.jsに返却する。
export async function getBlocksMaps() {
  const craftConfigSecret = BLOG.craftConfigShareUrl.slice(23)
  const craftConfigApiUrl = 'https://www.craft.do/api/share/' + craftConfigSecret
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  }
  const configResponse = await fetch(craftConfigApiUrl, init)
  const responseJson = await configResponse.json()

  const tables = getAllTables(responseJson)
  let pagesMap = []
  let siteConfigMap = []

  pagesMap.push(tables[0].cells)
  siteConfigMap.push(tables[1].cells)
  pagesMap = pagesMap[0]
  siteConfigMap = siteConfigMap[0]

  // オブジェクトへの変換後のアクセスが簡単になる
  const responseObj = {}
  responseJson.blocks.forEach(function (v) {
    responseObj[v.id] = v
  })

  const pagesJson = parsePagesMap(responseObj, pagesMap)
  const siteConfigObj = parseSiteConfigMap(responseObj, siteConfigMap)
  return { pagesJson, siteConfigObj }
}

// 2つのテーブルのpluginDataの内容を取得し、セル間の関係を確認することができます
function getAllTables(responseJson) {
  const pageBlocksLength = responseJson.blocks.length
  const tables = []

  for (let i = 0; i < pageBlocksLength; i = i + 1) {
    try {
      // 各ブロックの種類を決定し、テーブルのブロックを求め、テーブルのセル関係を取得する。
      const blockType = responseJson.blocks[i].type
      if (blockType === 'table') {
        // テーブルのセルの関係を持つ、テーブル内のpluginDataを取得する。
        tables.push(JSON.parse(responseJson.blocks[i].pluginData))
      }
    } catch (error) {
      console.log('craft.js error: ', error)
    }
  }
  return tables
}

// ページフォームの加工
function parsePagesMap(responseObj, tableMap) {
  const mapJson = []
  let titleColumId, craftUrlColumId, slugColumId
  for (let i = 0; i < tableMap.length; i++) {
    const blockId = tableMap[i].blockId
    const content = responseObj[blockId].content
    const rowId = tableMap[i].rowId
    const columnId = tableMap[i].columnId
    if (content === 'Title') {
      titleColumId = columnId
    } else if (content === 'Craft Share URL') {
      craftUrlColumId = columnId
    } else if (content === 'Slug') {
      slugColumId = columnId
    }
    const tpl = `{"content":"${content}","blockId":"${blockId}","rowId":"${rowId}","columnId":"${columnId}"}`
    mapJson.push(JSON.parse(tpl))
  }
  // console.log(mapJson)

  const pagesJson = getPagesJson(mapJson, titleColumId, craftUrlColumId, slugColumId)
  return pagesJson
}

// 最終的に利用可能なページのjsonを取得する
function getPagesJson(mapJson, titleColumId, craftUrlColumId, slugColumId) {
  const pagesJson = []
  for (let i = 0; i < mapJson.length; i++) {
    if (mapJson[i].columnId === titleColumId) {
      const nowRowId = mapJson[i].rowId
      let url, slug

      for (let j = 0; j < mapJson.length; j++) {
        if (mapJson[j].rowId === nowRowId && mapJson[j].columnId === craftUrlColumId) {
          url = mapJson[j].content
        }
        if (mapJson[j].rowId === nowRowId && mapJson[j].columnId === slugColumId) {
          slug = mapJson[j].content
        }
      }

      const title = mapJson[i].content
      const tpl = `{"title":"${title}","url":"${url}","slug":"${slug}"}`
      pagesJson.push(JSON.parse(tpl))
    }
  }
  return pagesJson
}

// 加工用セットアップフォーム
function parseSiteConfigMap(responseObj, tableMap) {
  const mapJson = []
  let configColumId, valueColumId
  for (let i = 0; i < tableMap.length; i++) {
    const blockId = tableMap[i].blockId
    const content = responseObj[blockId].content
    const rowId = tableMap[i].rowId
    const columnId = tableMap[i].columnId
    if (content === 'Setting Name') {
      configColumId = columnId
    } else if (content === 'Value') {
      valueColumId = columnId
    }
    const tpl = `{"content":"${content}","blockId":"${blockId}","rowId":"${rowId}","columnId":"${columnId}"}`
    mapJson.push(JSON.parse(tpl))
  }
  // console.log(mapJson)

  const siteConfigObj = getSiteConfigObj(mapJson, configColumId, valueColumId)
  return siteConfigObj
}

// 最終的に利用可能な設定jsonを取得する
function getSiteConfigObj(mapJson, configColumId, valueColumId) {
  const siteConfigJson = []
  for (let i = 0; i < mapJson.length; i++) {
    if (mapJson[i].columnId === configColumId) {
      const nowRowId = mapJson[i].rowId
      let value

      for (let j = 0; j < mapJson.length; j++) {
        if (mapJson[j].rowId === nowRowId && mapJson[j].columnId === valueColumId) {
          value = mapJson[j].content
        }
      }

      const key = mapJson[i].content
      const tpl = `{"key":"${key}","value":"${value}"}`
      siteConfigJson.push(JSON.parse(tpl))
    }
  }
  const siteConfigObj = {}
  siteConfigJson.forEach(function (v) {
    siteConfigObj[v.key] = v.value
  })
  return siteConfigObj
}
