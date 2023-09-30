import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Fight } from './Fight';
import { Stats } from './Stats';
import { Ranking } from './Ranking';

@Entity()
export class Fighter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  nationality: string;

  @Column()
  weightClass: string;

  @Column()
  team: string;

  @OneToMany(() => Fight, (fight) => fight.fighter1)
  fights1: Fight[];

  @OneToMany(() => Fight, (fight) => fight.fighter2)
  fights2: Fight[];

  @OneToOne(() => Stats, (stats) => stats.fighter)
  stats: Stats;

  @OneToOne(() => Ranking, (ranking) => ranking.fighter)
  rankings: Ranking[];
}
