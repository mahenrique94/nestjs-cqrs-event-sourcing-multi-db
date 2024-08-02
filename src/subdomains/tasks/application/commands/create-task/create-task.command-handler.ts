import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TaskEvent } from '../../../../tasks/infrastructure/database/task-event/task-event.model';
import { IRepository } from '../../../../../shared/modules/interfaces/repository.interface';

import { CreateTaskCommand } from './create-task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler
  implements ICommandHandler<CreateTaskCommand>
{
  logger = new Logger(CreateTaskCommandHandler.name);

  constructor(
    @Inject('ITaskEventRepository')
    private readonly repository: IRepository<TaskEvent>,
  ) {}

  async execute(command: CreateTaskCommand): Promise<void> {
    this.logger.log('[CreateTaskCommandHandler] Executing handler...');

    await this.repository.create({
      body: JSON.stringify(command),
      event: 'task_created',
    });
  }
}
