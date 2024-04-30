// src/app/page.tsx
import { agent } from "@/lib/api";

export default async function Homepage() {
  await agent.login({
    identifier: "kohyang.bsky.social",
    password: process.env.APP_PASSWORD || "",
  });
  const feeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 10,
  });

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-xl my-4">Top Feeds</h1>
      <ul>
        {feeds.data.feeds.map((feed) => (
          <li key={feed.displayName}>{feed.displayName}</li>
        ))}
      </ul>
    </div>
  );
}
