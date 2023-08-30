import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fighter } from './Fighter';
import { Fight } from './Fight';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weightClass: string;

  @ManyToOne(() => Fighter, (fighter) => fighter.rankings)
  fighter: Fighter;

  @Column()
  position: number;

  @Column()
  score: number;
}
