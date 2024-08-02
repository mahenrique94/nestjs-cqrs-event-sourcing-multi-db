import { Injectable } from '@nestjs/common';

import { IUseCase } from '../../../../shared/modules/interfaces/use-case.interface';
import { CommandBus } from '@nestjs/cqrs';
import { ArchiveTaskCommand } from '../commands/archive-task/archive-task.command';

type Input = {
  id: number;
};

@Injectable()
export class ArchiveTaskUseCase implements IUseCase<Input, Promise<void>> {
  constructor(private commandBus: CommandBus) {}

  async execute(input: Input): Promise<void> {
    return await this.commandBus.execute(new ArchiveTaskCommand(input.id));
  }
}
