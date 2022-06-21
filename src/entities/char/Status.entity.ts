import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("status")
export class Status {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ default: 1 })
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
  defense: number;

  @Column()
  hp: number;

  @Column({ default: 15 })
  points: number;
}
