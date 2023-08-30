import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Fight } from './Fight';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @OneToOne(() => Fight, (fight) => fight.event)
  fights: Fight[];
}
