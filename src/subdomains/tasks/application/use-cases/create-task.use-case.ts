import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateTaskCommand } from '../commands/create-task/create-task.command';
import { TaskCreateSchema } from '../../domain/schemas/task-create.schema';
import { IUseCase } from '../../../../shared/modules/interfaces/use-case.interface';

type Input = TaskCreateSchema;

@Injectable()
export class CreateTaskUseCase implements IUseCase<Input, Promise<void>> {
  constructor(private commandBus: CommandBus) {}

  async execute(input: Input): Promise<void> {
    await this.commandBus.execute(new CreateTaskCommand(input.description));
  }
}
