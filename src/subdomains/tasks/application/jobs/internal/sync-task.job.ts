import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { IRepository } from '../../../../../shared/modules/interfaces/repository.interface';
import { TaskEvent } from '../../../infrastructure/database/task-event/task-event.model';
import { TaskOutbox } from '../../../infrastructure/database/task-outbox/task-outbox.model';
import { Task } from '../../../domain/task.entity';

@Injectable()
export class SyncTaskJob {
  logger = new Logger(SyncTaskJob.name);

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
    this.logger.log('[SyncTaskJob] Executing job...');
    const events = await this.eventRepository.search({ event: 'task_created' });

    for (const event of events) {
      this.logger.log('[SyncTaskJob] precessing event');
      this.logger.log(JSON.stringify(event));

      const raw = await this.repository.create(JSON.parse(event.body));
      await this.outboxRepository.create({
        body: JSON.stringify(raw),
        event: 'task_synced',
      });
      await this.eventRepository.remove(event.id);
    }
  }
}
