import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fighter } from './Fighter';
import { Event } from './Event';

@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fighter, (fighter) => fighter.fights1)
  fighter1: Fighter;

  @ManyToOne(() => Fighter, (fighter) => fighter.fights2)
  fighter2: Fighter;

  @ManyToOne(() => Event, (event) => event.fights)
  event: Event;

  @Column()
  result: string;

  @Column({ type: 'text', nullable: true })
  resultDetail: string;
}
