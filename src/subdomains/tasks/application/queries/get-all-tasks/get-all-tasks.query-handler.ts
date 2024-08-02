import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllTasksDTO } from '../../../../tasks/domain/dtos/get-all-tasks.dto';
import { Task } from '../../../../tasks/domain/task.entity';
import { Collection } from '../../../../../shared/modules/interfaces/collection.interface';
import { IRepository } from '../../../../../shared/modules/interfaces/repository.interface';

import { GetAllTasksQuery } from './get-all-tasks.query';

type Output = {
  data: Collection<GetAllTasksDTO>;
};

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksQueryHandler
  implements IQueryHandler<GetAllTasksQuery>
{
  logger = new Logger(GetAllTasksQueryHandler.name);

  constructor(
    @Inject('ITaskRepository') private readonly repository: IRepository<Task>,
  ) {}

  async execute(_: GetAllTasksQuery): Promise<Output> {
    this.logger.log('[GetAllTasksQueryHandler] Executing query...');
    const tasks = await this.repository.getAll();
    return {
      data: tasks.map((task) => new GetAllTasksDTO(task)),
    };
  }
}
