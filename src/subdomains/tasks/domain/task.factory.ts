import { Task } from '../infrastructure/database/task/task.model';
import { IFactory } from '../../../shared/modules/interfaces/factory.interface';

import { Task as TaskEntity } from './task.entity';

export class TaskFactory implements IFactory {
  public static fromRaw(raw: Task): TaskEntity {
    const task = new TaskEntity();

    task.setdescription(raw.description);
    task.setDone(raw.done);
    task.setId(raw.id);

    return task;
  }
}
