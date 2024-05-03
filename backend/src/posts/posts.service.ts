import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { getTimeline } from 'src/lib/at-proto/get-timeline';
import { DEFAULT_TIMELINE_LIMIT } from 'src/common/constants';

@Injectable()
export class PostsService {
  // create(createPostDto: CreatePostDto) {
  //   return 'This action adds a new post';
  // }

  async findAll(limit = DEFAULT_TIMELINE_LIMIT, cursor = '') {
    return await getTimeline(limit, cursor);
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
