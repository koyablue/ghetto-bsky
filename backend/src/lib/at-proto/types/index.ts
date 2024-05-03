import {
  FeedViewPost,
  PostView,
  ReplyRef,
  NotFoundPost,
  BlockedPost,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';

export interface AppPostView extends PostView {
  record: {
    $type: string;
    createdAt: string; // ISO string ex) "2024-05-02T21:20:30.125Z"
    langs: string[]; // ex) ["en", "ja"]
    reply: {
      parent: {
        cid: string; // ex)	"bafyreibjtrb3o2vnhbjwwfiksic4agbhuusnofcqsv4zyjcdmtmqtbfspq"
        uri: string; // ex) "at://did:plc:sflxm2fxohaqpfgahgdlm7rl/app.bsky.feed.post/3krjwmb43c22m"
      };
      root: {
        cid: string;
        uri: string;
      };
    };
    text: string;
  };
}

export interface AppReplyRef extends ReplyRef {
  root:
    | AppPostView
    | NotFoundPost
    | BlockedPost
    | { $type: string; [k: string]: unknown };
  parent:
    | AppPostView
    | NotFoundPost
    | BlockedPost
    | { $type: string; [k: string]: unknown };
  [k: string]: unknown;
}

export interface AppFeedViewPost extends FeedViewPost {
  post: AppPostView;
  reply?: AppReplyRef;
}

// originally in the SDK
// TODO: move to util
export function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

// originally in the SDK
// TODO: move to util
export function hasProp<K extends PropertyKey>(
  data: object,
  prop: K,
): data is Record<K, unknown> {
  return prop in data;
}

export function isAppPostView(v: unknown): v is PostView {
  return (
    isObj(v) && hasProp(v, '$type') && v.$type === 'app.bsky.feed.defs#postView'
  );
}
