import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { IRepository } from '../../../../../shared/modules/interfaces/repository.interface';
import { TaskEvent } from '../../../infrastructure/database/task-event/task-event.model';
import { TaskOutbox } from '../../../infrastructure/database/task-outbox/task-outbox.model';
import { Task } from '../../../domain/task.entity';

@Injectable()
export class RemoveTaskJob {
  logger = new Logger(RemoveTaskJob.name);

  constructor(
    @Inject('ITaskRepository')
    private readonly repository: IRepository<Task>,
    @Inject('ITaskEventRepository')
    private readonly eventRepository: IRepository<TaskEvent>,
    @Inject('ITaskOutboxRepository')
    private readonly outboxRepository: IRepository<TaskOutbox>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async run() {
    this.logger.log('[RemoveTaskJob] Executing job...');
    const events = await this.eventRepository.search({
      event: 'task_archived',
    });

    for (const event of events) {
      this.logger.log('[RemoveTaskJob] precessing event');
      this.logger.log(JSON.stringify(event));

      await this.repository.remove(JSON.parse(event.body).id);
      await this.outboxRepository.create({
        body: JSON.stringify(event.body),
        event: 'task_removed',
      });
      await this.eventRepository.remove(event.id);
    }
  }
}
