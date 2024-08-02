import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tasks_outbox',
})
export class TaskOutbox {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  event: string;
}
