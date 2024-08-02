import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { TaskCreateSchema } from '../../domain/schemas/task-create.schema';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { DomainInvariantException } from '../../../../shared/modules/exceptions/domain-invariant.exception';
import { IRequestHandler } from '../../../../shared/modules/interfaces/request-handler.interface';

@Controller('tasks')
export class CreateTaskRequestHandler
  implements IRequestHandler<Promise<void>>
{
  constructor(private readonly useCase: CreateTaskUseCase) {}

  @HttpCode(201)
  @Post()
  async handle(@Body() body: TaskCreateSchema): Promise<void> {
    try {
      await this.useCase.execute(body);
    } catch (error) {
      if (error instanceof DomainInvariantException) {
        throw new BadRequestException((error as Error).message);
      }

      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
