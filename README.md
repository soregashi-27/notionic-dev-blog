## inspired
https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs

# Notionic

Notionicはリアルタイムで更新される静的ブログで、デプロイを再構築することなくNotionのページに変更を同期させます。
![Notionic](./banner.png)

## Demo

- Notionic: [https://notionic.vercel.app](https://notionic.vercel.app)
- My Blog: [https://zuolan.me](https://zuolan.me)

## Features

- Incremental static regeneration
- Outline
- テーマスイッチ
- 多言語対応
- ネイティブスタイルのコメント
- ローディングとトランジションアニメーション
- ブロックページ対応
- SEOとOpen Graphの最適化
- ニュースレター対応
- お問い合わせフォーム
- テレグラムボットの統合

## Quick Start

- Notionicのテンプレートを複製し、公開する。 [Notionic template](https://izuolan.notion.site/87d5fa7c98e04cb79ef55f60989dc765)
- [Fork](https://github.com/izuolan/notionic/fork) this project
- **blog.config.jsファイルをカスタマイズする**
- _(Optional)_ publicフォルダ内のfavicon.svg/png/icoを自作に置き換える。
- lib/lang.jsを自己紹介を兼ねて修正する。
- Vercel上にデプロイし、以下の環境変数を設定します。 [Vercel](https://vercel.com)
  - `NOTION_PAGE_ID` (Required): The ID of the Notion page you previously shared to the web, usually has 32 digits after your workspace address
  - eg: `https://your-username.notion.site/<NOTION_PAGE_ID>?v=<view_id>`

More details about Notionic deployment:

- [English](https://zuolan.me/en/notionic_en)
- [中文](https://zuolan.me/notionic)

## Development

```bash
# Init
pnpm install
# Develop
./dev.sh
# Build & Serve
pnpm build
pnpm start
```

## Reference & License

- [Notion-X](https://github.com/NotionX/react-notion-x)
- [Nobelium](https://github.com/craigary/nobelium)
- [NotionNext](https://github.com/tangly1024/NotionNext)

The MIT License.
