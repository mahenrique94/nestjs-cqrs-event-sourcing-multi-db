import {
  Controller,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ArchiveTaskUseCase } from '../../application/use-cases/archive-task.use-case';
import { BusinessRequirementException } from '../../../../shared/modules/exceptions/business-requirement.exception';
import { EntityNotFoundException } from '../../../../shared/modules/exceptions/entity-not-found.exception';
import { IRequestHandler } from '../../../../shared/modules/interfaces/request-handler.interface';

@Controller('tasks')
export class ArchiveTaskRequestHandler
  implements IRequestHandler<Promise<void>>
{
  constructor(private readonly useCase: ArchiveTaskUseCase) {}

  @Put(':id')
  async handle(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.useCase.execute({ id });
    } catch (error) {
      if (error instanceof BusinessRequirementException) {
        throw new NotAcceptableException("You can't archive a undone task");
      } else if (error instanceof EntityNotFoundException) {
        throw new NotFoundException((error as Error).message);
      }

      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
