import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IRepository } from '../../../../../shared/modules/interfaces/repository.interface';
import { EntityNotFoundException } from '../../../../../shared/modules/exceptions/entity-not-found.exception';
import { BusinessRequirementException } from '../../../../../shared/modules/exceptions/business-requirement.exception';
import { Task } from '../../../../tasks/domain/task.entity';
import { TaskEvent } from '../../../../tasks/infrastructure/database/task-event/task-event.model';

import { ArchiveTaskCommand } from './archive-task.command';

@CommandHandler(ArchiveTaskCommand)
export class ArchiveTaskCommandHandler
  implements ICommandHandler<ArchiveTaskCommand>
{
  logger = new Logger(ArchiveTaskCommandHandler.name);

  constructor(
    @Inject('ITaskRepository')
    private readonly repository: IRepository<Task>,
    @Inject('ITaskEventRepository')
    private readonly eventRepository: IRepository<TaskEvent>,
  ) {}

  async execute(command: ArchiveTaskCommand): Promise<void> {
    this.logger.log('[ArchiveTaskCommandHandler] Executing handler...');

    const task = await this.repository.getOne(command.id);

    if (!task) {
      throw new EntityNotFoundException(
        `Task with id ${command.id} doesn't exist`,
      );
    }

    if (!task.isDone()) {
      throw new BusinessRequirementException("You can't archive a undone task");
    }

    await this.eventRepository.create({
      body: JSON.stringify(command),
      event: 'task_archived',
    });
  }
}
