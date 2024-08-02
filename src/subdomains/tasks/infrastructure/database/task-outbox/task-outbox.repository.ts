import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Collection } from '../../../../../shared/modules/interfaces/collection.interface';
import { IRepository } from '../../../../../shared/modules/interfaces/repository.interface';
import { EntityNotFoundException } from '../../../../../shared/modules/exceptions/entity-not-found.exception';
import { Nullable } from '../../../../../shared/modules/interfaces/nullable.interface';

import { TaskOutbox } from './task-outbox.model';

@Injectable()
export class TaskOutboxRepository implements IRepository<TaskOutbox> {
  constructor(
    @InjectRepository(TaskOutbox, 'events')
    private readonly model: Repository<TaskOutbox>,
  ) {}

  public async create(outbox: TaskOutbox): Promise<TaskOutbox> {
    return await this.model.save(outbox);
  }

  public async getAll(): Promise<Collection<TaskOutbox>> {
    return await this.model.find();
  }

  public async getOne(pk: number): Promise<Nullable<TaskOutbox>> {
    const raw = await this.model.findOneBy({ id: pk });
    return raw ? raw : null;
  }

  public async remove(pk: number): Promise<void> {
    const raw = await this.getOne(pk);

    if (!raw) {
      throw new EntityNotFoundException(
        `You can't remove the task ${pk} because doesn't exist`,
      );
    }

    await this.model.remove(raw);
  }

  public async search(where: any): Promise<Collection<TaskOutbox>> {
    return await this.model.find({ where });
  }
}
