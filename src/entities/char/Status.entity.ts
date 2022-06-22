import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("status")
export class Status {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 1 })
  vigor: number;

  @Column({ default: 1 })
  strength: number;

  @Column({ default: 1 })
  agility: number;

  @Column({ default: 1 })
  magic: number;

  @Column({ default: 1 })
  defense: number;

  @Column()
  hp: number;

  @Column({ default: 10 })
  points: number;
}
