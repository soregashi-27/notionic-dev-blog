/**
 * Google Analyticsのトラッキング情報を取得する
 * 
 * 「開発時の確認事項」
 * Google AnalyticsのトラッキングIDが正しく取得されていることを確認する。
 * pageview関数が正しく実装されていることを確認する。
 * event関数が正しく実装されていることを確認する。
 * このコードが、Google AnalyticsのAPIを使用してトラッキング情報を送信することを認識する。
 * 
 */

import BLOG from '@/blog.config'
export const GA_TRACKING_ID = BLOG.analytics.gaConfig.measurementId

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events/
export const event = ({ action, category, label, level }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: level
  })
}
