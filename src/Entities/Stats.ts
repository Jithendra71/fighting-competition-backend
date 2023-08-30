import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Fighter } from './Fighter';

@Entity()
export class Stats {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Fighter, (fighter) => fighter.stats)
  fighter: Fighter;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @Column()
  knockouts: number;

  @Column()
  submissions: number;
}
