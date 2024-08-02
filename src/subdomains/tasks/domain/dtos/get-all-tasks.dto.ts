import { Task } from '../task.entity';
import { IDTO } from '../../../../shared/modules/interfaces/dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllTasksDTO implements IDTO {
  @ApiProperty()
  public readonly _id: number;

  @ApiProperty()
  public readonly describe: string;

  @ApiProperty()
  public readonly finished: boolean;

  constructor(input: Task) {
    this._id = input.id;
    this.describe = input.description;
    this.finished = input.done;
  }
}
