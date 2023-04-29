/**
 * ブログの内部設定
 * 
 */



const BLOG = {
  title: 'tomomemo.com',
  author: 'Tomo from "tomomemo.com"',
  email: 'contact.tomo.studyvlog@gmail.com',
  link: 'https://tomomemo.com',
  newsletter: 'Comming soon..',
  description: '未経験からエンジニアを目指す人へ向けた、現役エンジニアがつづるメモ書き',
  lang: 'ja-JP', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  timezone: 'Asia/Shanghai', // See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for all options.
  appearance: 'auto', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  lightBackground: '#F6F8FA', // 16進数の値を使用 '#' を忘れずに。 e.g #fffefc
  darkBackground: '#212936', // 16進数の値を使用 '#' を忘れずに。
  path: '', // Notionicをフォルダに展開する場合を除き、空欄のままにしておきます。 thanks to notionic.
  since: '2023', // 空欄の場合は、現在の年度が使用されます。
  postsPerPage: 10, 
  sortByDate: true,
  pagesShow: {
    newsletter: true,
    notes: false,
    projects: false,
    contact: true,
    books: true,
    friends: false,
    sitemap: true
  },
  showWeChatPay: true,
  previewImagesEnabled: true,
  autoCollapsedNavBar: false, // ナビゲーションバーは自動的に折りたたまれる（default: false）
  ogImageGenerateHost: 'og-zl.vercel.app', // OG画像を生成するためのリンクで、スラッシュで終わらないようにしてください。
  defaultCover: '/cover.jpg',
  socialLink: {
    twitter: 'https://twitter.com/izuolan', // LINKEDINアイコンへ変更予定
    github: 'https://github.com/',
    //telegram: 'https://t.me/zuolan' // 削除予定
  },
  seo: {
    keywords: ['tomomemo', 'tomo study vlog', 'とも スタディブログ', 'とも スタディブログ', 'エンジニア ブログ', 'エンジニア ブログ 開発'],
    googleSiteVerification: '' // 独自のgoogleサイト認証コードに置き換えてください。
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionSpacesId: process.env.NOTION_SPACES_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // データベースを公開したくない場合に便利
  notionDomain: 'izuolan.notion.site',
  telegramToken: process.env.TELEGRAM_TOKEN, // Telegramボットのトークン
  telegramChatId: '', // TelegramボットのチャットID
  telegramChannelUrl: '', // TelegramボットのLINK
  telegramChannelName: '', // Telegramボットのチャンネル名
  craftConfigShareUrl: 'https://www.craft.do/s/kQtcWqkv98cHhB', // The link to share your craft config
  analytics: {
    provider: '', // 現在、Google Analytics、Ackee、Umami、Cloudflare Insightsに対応していますので、「ga」または「ackee」または「umami」または「cf」を記入してください。空欄にすると無効になります。
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.example.com/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.example.com , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    cfConfig: {
      scriptUrl: 'https://static.cloudflareinsights.com/beacon.min.js', // Default
      token: '' // Like '{"token": "xxxxxxxxxxxxxxxxxx"}'
    },
    gaConfig: {
      measurementId: '' // e.g: G-XXXXXXXXXX
    },
    umamiConfig: {
      scriptUrl: '', // The url of your Umami script
      websiteId: '' // The website id of your Umami instance
    }
  },
  comment: {
    // support provider: utterances, supacomments
    provider: '', // leave it empty if you don't need any comment plugin
    supaCommentsConfig: {
      supabaseUrl: '', // The url of your Supabase instance
      supabaseAnonKey: '' // The anonymous key of your Supabase instance
    },
    utterancesConfig: {
      repo: ''
    }
  },
  isProd: process.env.VERCEL_ENV === 'production' // vercelでデプロイする場合、開発環境と本番環境を区別する (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}
// export default BLOG
module.exports = BLOG
