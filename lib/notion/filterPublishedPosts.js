/**
 * 投稿（Post）とニュースレター（Newsletter）の記事のみを取得する
 * 投稿の配列をフィルタリングするための関数を定義
 * 
 * 非公開記事（Hidden）を表示するかどうか、および公開済みの記事のみを表示するかどうかを指定するためのフラグ
 */

export default function filterPublishedPosts({
  posts,
  onlyNewsletter,
  onlyPost,
  onlyHidden
}) {
  if (!posts || !posts.length) return []
  return posts
    .filter((post) =>
      onlyNewsletter
        ? post?.type?.[0] === 'Newsletter'
        : post
    )
    .filter((post) =>
      onlyPost
        ? post?.type?.[0] === 'Post'
        : post
    )
    .filter((post) =>
      onlyHidden
        ? post?.type?.[0] === 'Hidden'
        : post?.type?.[0] !== 'Hidden'
    )
    .filter((post) => {
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        post.date <= new Date()
      )
    })
}
