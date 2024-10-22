import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tasks',
})
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  description: string;

  @Column({ default: false, nullable: false })
  done: boolean;
}
