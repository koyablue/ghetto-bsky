import { Injectable } from '@nestjs/common';
import { DEFAULT_TIMELINE_LIMIT } from 'src/common/constants';
import { AtProtoService } from '../at-proto/at-proto.service';

@Injectable()
export class PostsService {
  constructor(private readonly atProtoService: AtProtoService) {}

  // create(createPostDto: CreatePostDto) {
  //   return 'This action adds a new post';
  // }

  async findAll(limit = DEFAULT_TIMELINE_LIMIT, cursor = '') {
    return await this.atProtoService.getTimeline(limit, cursor);
    // return await getTimeline(this.agent, limit, cursor);
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
