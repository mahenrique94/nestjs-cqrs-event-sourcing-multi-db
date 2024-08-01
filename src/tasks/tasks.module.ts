import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.model';

@Module({
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([Task])],
})
export class TasksModule {}
