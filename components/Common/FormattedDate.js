/**
 * 日付をローカライズして表示する
 * 執筆日、最終更新日を表示
 * 
 */


import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import BLOG from '@/blog.config'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

// デフォルトの言語をBLOG.langに設定する。
dayjs.extend(localizedFormat)
const lang = BLOG.lang.slice(0, 2)
import(`dayjs/locale/${lang}`)
  .then(() => {
    dayjs.locale(BLOG.lang.slice(0, 2))
  })
  .catch(() => console.warn(`dayjs locale \`${lang}\` not found`))

export default function FormattedDate ({ date }) {
  const [ hasMounted, setHasMounted ] = useState(false)
  const { locale } = useRouter()

  // 言語を切り替えると、それに伴って日付の形式も変更する
  const formattedDate = useMemo(() => {
    try {
      import(`dayjs/locale/${locale}`)
      dayjs.locale(locale)
    } catch (err) {
      console.warn(`dayjs locale \`${locale}\` not found`)
    }
    // TODO: SEO的にどの書き方がいいかを検証する
    //return dayjs(date).format('ll')
    return dayjs(date).format('ll') + " (Last Updated: " + dayjs(date).format('LL') + ")"
    //return dayjs(date).format('ll') + " (Last Updated: " + dayjs(date).format('LLL') + ")"
  }, [locale, date])

  // サーバーサイドとクライアントサイドでレンダリングに一貫性がない問題を解決する。
  useEffect(() => {
    setHasMounted(true)
  }, [locale])

  if (!hasMounted) {
    return null
  }
  return <span>{formattedDate}</span>
}


