import { agent } from './init';

export const getTimeline = async () => {
  const { data } = await agent.getTimeline({
    cursor: '',
    limit: 30,
  });

  // const { feed: postsArray, cursor: nextPage } = data;
  // console.dir(postsArray, { depth: null });

  if (!data?.feed) {
    console.log('No timeline data');
    return;
  }

  const ret: any[] = [];
  data.feed.forEach(function ({ post, reply }) {
    const author = reply?.parent.author as any;
    const replyTo = reply ? `↩ @${author.handle}` : '';
    const stats = `REPLY:${post.replyCount} SHARE:${post.repostCount} LIKE:${post.likeCount}`;
    const handle = `@${post.author.handle}`;
    const record = post.record as any;
    const content = record.text;
    const sky = `${content}

${stats}
`;

    ret.push(`${handle} ${replyTo} ${sky}`);
  });

  // return data;
  return ret;
};
