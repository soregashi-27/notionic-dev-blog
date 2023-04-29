/**
 * 画像の軽量版（LQIP）を作成するためのツール
 * 
 */


import pMap from 'p-map'
import sharp from 'sharp'

/**
 * @name lqipModern
 *
 * @param {Buffer|string|Buffer[]|string[]} input - 画像入力の配列，あるいは1つの画像入力．
 * 各画像入力は，生の画像データを含む `Buffer` か，サポートされる画像タイプへのファイルシステムパスを含む `string` のどちらかです．
 * @param {Object}. [opts] - オプションの設定オプションです．
 * @param {number} [opts.concurrency=4] - 入力画像の配列を処理する際の並列処理．
 * @param {string} [opts.outputFormat='webp'] - `webp` または `jpeg` のどちらかを使用する出力フォーマットです（`jpg`を渡すと `jpeg` を渡すのと同じになります）．
 * @param {Object}. [opts.outputOptions] - `opts.outputFormat`に依存して `sharp.webp` または `sharp.jpeg` に渡される出力オプション。
 * @param {number|any[]}を指定します。[opts.resize] - `sharp.resize` に渡すオプション。デフォルトでは、入力された画像は最大で `16` の寸法にリサイズされ、他の寸法は縦横比を維持するために計算されます。もっとコントロールしたい場合は、ここに引数の配列を渡すと `sharp.resize` に転送されます。
 */
export default async function lqipModern(input, opts = {}) {
  const { concurrency = 4, ...rest } = opts

  if (Array.isArray(input)) {
    return pMap(input, async (image) => computeLqipImage(image, rest), {
      concurrency
    })
  } else {
    return computeLqipImage(input, opts)
  }
}

async function computeLqipImage(input, opts = {}) {
  const { resize = 16, outputFormat = 'webp', outputOptions } = opts

  const image = sharp(input).rotate()
  const metadata = await image.metadata()

  const resized = image.resize(
    ...(Array.isArray(resize)
      ? resize
      : [
          Math.min(metadata.width, resize),
          Math.min(metadata.height, resize),
          { fit: 'inside' }
        ])
  )
  let output

  if (outputFormat === 'webp') {
    output = resized.webp({
      quality: 20,
      alphaQuality: 20,
      smartSubsample: true,
      ...outputOptions
    })
  } else if (outputFormat === 'jpg' || outputFormat === 'jpeg') {
    output = resized.jpeg({
      quality: 20,
      ...outputOptions
    })
  } else {
    throw new Error(`Invalid outputformat "${outputFormat}"`)
  }

  const { data, info } = await output.toBuffer({ resolveWithObject: true })

  return {
    content: data,
    metadata: {
      originalWidth: metadata.width,
      originalHeight: metadata.height,
      width: info.width,
      height: info.height,
      type: outputFormat,
      dataURIBase64: `data:image/webp;base64,${data.toString('base64')}`
    }
  }
}
