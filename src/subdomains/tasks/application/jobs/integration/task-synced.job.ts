import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { IRepository } from '../../../../../shared/modules/interfaces/repository.interface';
import { TaskOutbox } from '../../../infrastructure/database/task-outbox/task-outbox.model';

@Injectable()
export class TaskSyncedJob {
  logger = new Logger(TaskSyncedJob.name);

  constructor(
    @Inject('ITaskOutboxRepository')
    private readonly outboxRepository: IRepository<TaskOutbox>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async run() {
    this.logger.log('[TaskSyncedJob] Executing job...');
    const events = await this.outboxRepository.search({ event: 'task_synced' });

    for (const event of events) {
      this.logger.log('[TaskSyncedJob] precessing event');
      this.logger.log(JSON.stringify(event));

      await this.outboxRepository.remove(event.id);
    }
  }
}
