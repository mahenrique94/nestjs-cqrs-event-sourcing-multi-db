import { DomainInvariantException } from '../../../shared/modules/exceptions/domain-invariant.exception';
import { IEntity } from '../../../shared/modules/interfaces/entity.interface';

export class Task implements IEntity {
  private _id: number;
  private _description: string;
  private _done: boolean;

  public get id(): number {
    return this._id;
  }

  public get description(): string {
    return this._description;
  }

  public get done(): boolean {
    return this._done;
  }

  public setId(id: number): void {
    if (!id) {
      new DomainInvariantException(
        'Property `id` is required to create a task',
      );
    }

    this._id = id;
  }

  public setdescription(description: string): void {
    if (!description) {
      new DomainInvariantException(
        'Property `description` is required to create a task',
      );
    }

    this._description = description;
  }

  public setDone(done: boolean): void {
    if (!done) {
      new DomainInvariantException(
        'Property `done` is required to create a task',
      );
    }

    this._done = done;
  }

  public isDone(): boolean {
    return this.done;
  }
}
