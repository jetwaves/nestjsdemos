import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tries_count: number;

  @Column({ nullable: true })
  latest_feedback: string;

  @Column({ nullable: true })
  ref: number;
}
