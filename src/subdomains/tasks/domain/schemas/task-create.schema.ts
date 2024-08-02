import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TaskCreateSchema {
  @ApiProperty()
  @IsString()
  description: string;
}
