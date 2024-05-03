import { agent } from './init';
import { AppFeedViewPost, isAppPostView } from './types';

// Receive cursor value of API response
export const getTimeline = async (limit: number, cursor: string) => {
  const { data } = await agent.getTimeline({
    cursor,
    limit,
  });
  const { feed, cursor: newCursor } = data;
  if (!feed || !feed.length) {
    console.log('No timeline data');
    return;
  }

  const appFeedViewPosts = feed as AppFeedViewPost[];

  return { feed: appFeedViewPosts, cursor: newCursor };
};

export const getTimelineTmp = async () => {
  const { data } = await agent.getTimeline({
    cursor: '',
    limit: 100, // TODO: make it const
  });
  const { feed } = data;
  if (!feed) {
    console.log('No timeline data');
    return;
  }
  const postsArray = feed as AppFeedViewPost[];

  // const { feed: postsArray, cursor: nextPage } = data;
  // console.dir(postsArray, { depth: null });

  const ret: any[] = [];
  postsArray.forEach(function ({ post, reply, reason }) {
    const replyTo = isAppPostView(reply.parent)
      ? reply.parent.author.handle
      : '';
    const stats = `REPLY:${post.replyCount} SHARE:${post.repostCount} LIKE:${post.likeCount}`;
    const handle = `@${post.author.handle}`;
    const record = post.record as any;
    const content = post.record.text;
    const sky = `${content}

${stats}
`;

    // ret.push(`${handle} ${replyTo} ${sky} createdAt: ${record.createdAt}`);
    ret.push({ handle, replyTo, sky, reason, createdAt: record.createdAt });
  });

  // return data;
  return ret;
};
