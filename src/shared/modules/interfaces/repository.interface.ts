import { Collection } from './collection.interface';
import { IEntity } from './entity.interface';

export interface IRepository<E extends IEntity> {
  create(e: Partial<E>): Promise<E>;
  getAll(): Promise<Collection<E>>;
  getOne(pk: number): Promise<E>;
  remove(pk: number): Promise<void>;
  search(where: any): Promise<Collection<E>>;
}
