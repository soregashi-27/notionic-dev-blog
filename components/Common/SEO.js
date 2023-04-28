/**
 * SEO（検索エンジン最適化）を担当するReactコンポーネント
 * 
 * 概要
 * ページのタイトル、メタタグ、OGタグ、などの重要なSEO要素を生成
 * ブログ設定ファイル（blog.config.js）からの構成オプションを読み取り、メタ情報を生成
 * 記事の場合は、公開日時と作成者情報を追加
 * 
 * TODO
 * 最新更新日時を追加したい
 */


import BLOG from '@/blog.config'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SEO = ({ meta }) => {
  const ogImage = `https://${BLOG.ogImageGenerateHost}/api/default?logo=${
    BLOG.link
  }/favicon.png&siteName=${encodeURIComponent(
    BLOG.title?.trim()
  )}&description=${encodeURIComponent(
    BLOG.description?.trim()
  )}&title=${encodeURIComponent(
    meta.title?.trim()
  )}&summary=${encodeURIComponent(
    meta.description?.trim()
  )}&theme=light&border=solid`

  const router = useRouter()
  const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link
  return (
    <Head>
      <title>{meta.title}</title>
      {/* <meta content={BLOG.darkBackground} name='theme-color' /> */}
      <meta name='robots' content='follow, index' />
      <meta charSet='UTF-8' />
      {BLOG.seo.googleSiteVerification && (
        <meta
          name='google-site-verification'
          content={BLOG.seo.googleSiteVerification}
        />
      )}
      {BLOG.seo.keywords && (
        <meta name='keywords' content={BLOG.seo.keywords.join(', ')} />
      )}
      <meta name='description' content={meta.description} />
      <meta property='og:locale' content={BLOG.lang} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:description' content={meta.description} />
      <meta
        property='og:url'
        content={meta.slug ? `${url}/${meta.slug}` : `${url}${router.asPath}`}
      />
      <meta
        property='og:image'
        content={ogImage || BLOG.defaultCover}
      />
      <meta property='og:type' content={meta.type} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:title' content={meta.title} />
      <meta
        name='twitter:image'
        content={ogImage || BLOG.defaultCover}
      />
      {meta.type === 'article' && (
        <>
          <meta
            property='article:published_time'
            content={meta.date}
          />
          <meta property='article:author' content={BLOG.author} />
        </>
      )}
    </Head>
  )
}

export default SEO
