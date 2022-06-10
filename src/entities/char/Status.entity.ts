import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("status")
export class Status {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  level: number;

  @Column()
  vigor: number;

  @Column()
  strength: number;

  @Column()
  agility: number;

  @Column()
  magic: number;

  @Column()
  defence: number;

  @Column()
  hp: number;

  @Column({ default: 15 })
  points: number;
}
