import { Controller, Post, Body } from '@nestjs/common';
import { AtProtoService } from './at-proto.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AtProtoController {
  constructor(private readonly authService: AtProtoService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const { identifier, password } = credentials;
    return await this.authService.login(identifier, password);
  }
}
