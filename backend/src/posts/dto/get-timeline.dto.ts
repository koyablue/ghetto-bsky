import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsDateString } from 'class-validator';

export class GetTimelineDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsDateString()
  cursor: string;
}
