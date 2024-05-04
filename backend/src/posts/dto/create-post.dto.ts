import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  text: string;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;
}
