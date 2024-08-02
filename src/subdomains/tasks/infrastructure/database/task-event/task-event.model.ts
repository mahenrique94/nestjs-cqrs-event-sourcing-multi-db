import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tasks_events',
})
export class TaskEvent {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  event: string;
}
