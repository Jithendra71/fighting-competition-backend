import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Fighter } from './Fighter';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weightClass: string;

  @OneToOne(() => Fighter, (fighter) => fighter.rankings)
  fighter: Fighter;

  @Column()
  position: number;

  @Column()
  score: number;
}
