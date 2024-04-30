// src/app/page.tsx
import { agent } from "@/lib/api";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export default async function Homepage() {
  await agent.login({
    identifier: "yohjo.bsky.social",
    password: process.env.APP_PASSWORD || "",
  });
  const feeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 10,
  });

  const { data } = await agent.getTimeline({
    cursor: "",
    limit: 30,
  });

  const { feed: postsArray, cursor: nextPage } = data;
  console.dir(postsArray, { depth: null });

  function findDuplicateCidPosts(posts: FeedViewPost[]): FeedViewPost[] {
    const cidCount: Record<string, number> = {};
    const duplicates: FeedViewPost[] = [];

    // 各ポストのcidをカウントする
    posts.forEach((post) => {
      if (cidCount[post.post.cid]) {
        cidCount[post.post.cid]++;
      } else {
        cidCount[post.post.cid] = 1;
      }
    });

    // 2回以上出現するcidを持つポストを追加する
    posts.forEach((post) => {
      if (cidCount[post.post.cid] > 1) {
        duplicates.push(post);
      }
    });

    return duplicates;
  }

  // 重複するCIDのポストをフィルタリングする例
  const duplicatePosts = findDuplicateCidPosts(postsArray);
  // console.dir(duplicatePosts, { depth: null });

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-xl my-4">Top Feeds</h1>
      <ul>
        {postsArray.map((postObj) => (
          <li
            className="border border-slate-600 mb-4"
            key={
              postObj.reason?.$type === "app.bsky.feed.defs#reasonRepost"
                ? `${postObj.post.uri}${postObj.reason?.by?.handle}`
                : postObj.post.uri
            }
          >
            {"text" in postObj.post.record
              ? (postObj.post.record.text as string)
              : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
