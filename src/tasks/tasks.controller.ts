import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.model';
import { Repository } from 'typeorm';
import { IsString } from 'class-validator';

class TaskInput {
  @IsString()
  description: string;
}

@Controller('tasks')
export class TasksController {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  @HttpCode(201)
  @Post()
  async create(@Body() body: TaskInput) {
    return {
      data: await this.taskRepository.save(body),
    };
  }

  @Get()
  async getAll() {
    return {
      data: await this.taskRepository.find(),
    };
  }
}
