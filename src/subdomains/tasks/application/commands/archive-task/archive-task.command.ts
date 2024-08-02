import { ICommand } from '@nestjs/cqrs';

export class ArchiveTaskCommand implements ICommand {
  constructor(public readonly id: number) {}
}
