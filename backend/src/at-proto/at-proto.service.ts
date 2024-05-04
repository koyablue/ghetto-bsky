import { Injectable } from '@nestjs/common';
import { AtpSessionData, AtpSessionEvent, BskyAgent } from '@atproto/api';
import { APP_VIEW_URL } from '../common/constants/at-proto';
import { AppFeedViewPost } from 'src/lib/at-proto/types';
import { DEFAULT_TIMELINE_LIMIT } from 'src/common/constants';

@Injectable()
export class AtProtoService {
  private agent: BskyAgent;
  private savedSessionData: AtpSessionData;

  constructor() {
    this.agent = new BskyAgent({
      service: APP_VIEW_URL,
      persistSession: (_: AtpSessionEvent, session?: AtpSessionData) => {
        // TODO: Temporary. Fix this later
        if (!session) {
          throw new Error(
            'No session data to persist. Did ya pass an incorrect username/password?',
          );
        }
        // store the session-data for reuse
        this.savedSessionData = session;
      },
    });
  }

  async login(identifier: string, password: string) {
    try {
      // If already logged in, resume session
      if (this.agent.session) {
        console.log('Already logged in...');
      }

      console.log('Logging in...');
      if (this.savedSessionData) {
        console.log('Found saved session data. Resuming session...');
        await this.agent.resumeSession(this.savedSessionData);
      } else {
        console.log('No saved session data. Logging in...');

        await this.agent.login({
          identifier,
          password,
        });
      }

      // return { success: true, message: 'Login successful' };
      // return this.agent;
    } catch (error) {
      console.error('Error logging in:', error);
      // return { success: false, message: 'Login failed' };
    }
  }

  async getTimeline(limit = DEFAULT_TIMELINE_LIMIT, cursor = '') {
    console.log(this.agent.session);
    console.log(this.savedSessionData);
    const { data } = await this.agent.getTimeline({
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
  }

  // TODO: images
  // TODO: mention
  // TODO: quoted
  // TODO: link
  // TODO: tags
  async createPost(text: string, createdAt: string) {
    try {
      return await this.agent.post({ text, createdAt });
    } catch (error) {
      console.log('Failed to create a post', error);
    }
  }
}
