import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task as TaskEntity } from '../../../domain/task.entity';
import { TaskFactory } from '../../../domain/task.factory';
import { Collection } from '../../../../../shared/modules/interfaces/collection.interface';
import { IRepository } from '../../../../../shared/modules/interfaces/repository.interface';
import { EntityNotFoundException } from '../../../../../shared/modules/exceptions/entity-not-found.exception';
import { Nullable } from '../../../../../shared/modules/interfaces/nullable.interface';

import { Task } from './task.model';

@Injectable()
export class TaskRepository implements IRepository<TaskEntity> {
  constructor(
    @InjectRepository(Task, 'data') private readonly model: Repository<Task>,
  ) {}

  public async create(
    task: Pick<TaskEntity, 'description'>,
  ): Promise<TaskEntity> {
    const raw = await this.model.save(task);
    return TaskFactory.fromRaw(raw);
  }

  public async getAll(): Promise<Collection<TaskEntity>> {
    const tasks = await this.model.find();
    return tasks.map((task) => TaskFactory.fromRaw(task));
  }

  public async getOne(pk: number): Promise<Nullable<TaskEntity>> {
    const raw = await this.model.findOneBy({ id: pk });
    return raw ? TaskFactory.fromRaw(raw) : null;
  }

  public async remove(pk: number): Promise<void> {
    const raw = await this.model.findOneBy({ id: pk });

    if (!raw) {
      throw new EntityNotFoundException(
        `You can't remove the task ${pk} because doesn't exist`,
      );
    }

    await this.model.remove(raw);
  }

  public async search(where: any): Promise<Collection<TaskEntity>> {
    const tasks = await this.model.find({ where });
    return tasks.map((task) => TaskFactory.fromRaw(task));
  }
}
