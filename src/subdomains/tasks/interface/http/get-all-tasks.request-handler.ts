import { Controller, Get } from '@nestjs/common';

import { GetAllTasksUseCase } from '../../application/use-cases/get-all-tasks.use-case';
import { GetAllTasksDTO } from '../../domain/dtos/get-all-tasks.dto';
import { Collection } from '../../../../shared/modules/interfaces/collection.interface';
import { IRequestHandler } from '../../../../shared/modules/interfaces/request-handler.interface';

type Output = {
  data: Collection<GetAllTasksDTO>;
};

@Controller('tasks')
export class GetAllTasksRequestHandler
  implements IRequestHandler<Promise<Output>>
{
  constructor(private readonly useCase: GetAllTasksUseCase) {}

  @Get()
  async handle(): Promise<Output> {
    return this.useCase.execute();
  }
}
