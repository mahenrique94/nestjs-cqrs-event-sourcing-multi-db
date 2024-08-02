import { Injectable } from '@nestjs/common';

import { GetAllTasksDTO } from '../../domain/dtos/get-all-tasks.dto';
import { Collection } from '../../../../shared/modules/interfaces/collection.interface';
import { IUseCase } from '../../../../shared/modules/interfaces/use-case.interface';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllTasksQuery } from '../queries/get-all-tasks/get-all-tasks.query';

type Output = {
  data: Collection<GetAllTasksDTO>;
};

@Injectable()
export class GetAllTasksUseCase implements IUseCase<void, Promise<Output>> {
  constructor(private queryBus: QueryBus) {}

  async execute(_: void): Promise<Output> {
    return await this.queryBus.execute(new GetAllTasksQuery());
  }
}
