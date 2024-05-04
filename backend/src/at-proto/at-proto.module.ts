import { Module } from '@nestjs/common';
import { AtProtoService } from './at-proto.service';
import { AtProtoController } from './at-proto.controller';

@Module({
  controllers: [AtProtoController],
  providers: [AtProtoService],
  exports: [AtProtoService],
})
export class AtProtoModule {}
