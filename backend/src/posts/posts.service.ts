import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { DEFAULT_TIMELINE_LIMIT } from 'src/common/constants';
import { AtProtoService } from '../at-proto/at-proto.service';

@Injectable()
export class PostsService {
  constructor(private readonly atProtoService: AtProtoService) {}

  async create(createPostDto: CreatePostDto) {
    const { text, createdAt } = createPostDto;
    return await this.atProtoService.createPost(text, createdAt);
  }

  async getTimeline(limit = DEFAULT_TIMELINE_LIMIT, cursor = '') {
    return await this.atProtoService.getTimeline(limit, cursor);
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
