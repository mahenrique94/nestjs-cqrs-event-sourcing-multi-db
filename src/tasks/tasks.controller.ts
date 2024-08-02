import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotAcceptableException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put(':id')
  async archive(@Param('id', ParseIntPipe) id: number) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException();
    }

    if (task.done) {
      await this.taskRepository.delete(task);
      return;
    }

    throw new NotAcceptableException("You can't archive a undone task");
  }

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
