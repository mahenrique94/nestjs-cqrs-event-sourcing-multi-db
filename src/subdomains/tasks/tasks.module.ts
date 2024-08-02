import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateTaskCommandHandler } from './application/commands/create-task/create-task.command-handler';
import { ArchiveTaskUseCase } from './application/use-cases/archive-task.use-case';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { Task } from './infrastructure/database/task/task.model';
import { GetAllTasksUseCase } from './application/use-cases/get-all-tasks.use-case';
import { TaskRepository } from './infrastructure/database/task/task.repository';
import { CreateTaskRequestHandler } from './interface/http/create-task.request-handler';
import { ArchiveTaskRequestHandler } from './interface/http/archive-task.request-handler';
import { GetAllTasksRequestHandler } from './interface/http/get-all-tasks.request-handler';
import { ArchiveTaskCommandHandler } from './application/commands/archive-task/archive-task.command-handler';
import { TaskOutboxRepository } from './infrastructure/database/task-outbox/task-outbox.repository';
import { TaskOutbox } from './infrastructure/database/task-outbox/task-outbox.model';
import { GetAllTasksQueryHandler } from './application/queries/get-all-tasks/get-all-tasks.query-handler';
import { TaskEventRepository } from './infrastructure/database/task-event/task-event.repository';
import { TaskEvent } from './infrastructure/database/task-event/task-event.model';
import { SyncTaskJob } from './application/jobs/internal/sync-task.job';
import { RemoveTaskJob } from './application/jobs/internal/remove-task.job';
import { TaskSyncedJob } from './application/jobs/integration/task-synced.job';

const commandHandlers = [ArchiveTaskCommandHandler, CreateTaskCommandHandler];
const eventHandlers = [];
const jobs = [RemoveTaskJob, SyncTaskJob, TaskSyncedJob];
const queryHandlers = [GetAllTasksQueryHandler];
const useCases = [ArchiveTaskUseCase, CreateTaskUseCase, GetAllTasksUseCase];

@Module({
  controllers: [
    ArchiveTaskRequestHandler,
    CreateTaskRequestHandler,
    GetAllTasksRequestHandler,
  ],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Task], 'data'),
    TypeOrmModule.forFeature([TaskEvent, TaskOutbox], 'events'),
  ],
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    ...jobs,
    ...queryHandlers,
    ...useCases,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
    {
      provide: 'ITaskEventRepository',
      useClass: TaskEventRepository,
    },
    {
      provide: 'ITaskOutboxRepository',
      useClass: TaskOutboxRepository,
    },
  ],
})
export class TasksModule {}
