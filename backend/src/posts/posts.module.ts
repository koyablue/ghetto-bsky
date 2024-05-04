import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AtProtoModule } from '../at-proto/at-proto.module';

@Module({
  imports: [AtProtoModule],
  controllers: [PostsController],
  // providers: [PostsService, AtProtoService],
  providers: [PostsService],
})
export class PostsModule {}
