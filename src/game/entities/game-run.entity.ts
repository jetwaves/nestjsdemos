import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GameRun {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column()
  game_ref: number;

  @Column()
  proposal: number;

  @Column()
  feedback: string;
}
