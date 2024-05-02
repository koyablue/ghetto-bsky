import { Injectable } from '@nestjs/common';
import { getTimeline } from './lib/at-proto/get-timeline';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getTimeline() {
    return await getTimeline();
  }
}
