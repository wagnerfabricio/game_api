import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Attack, Status, Sprite } from "./";

@Entity("chars")
export class Char {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  name: string;

  @Column()
  token: string;

  @OneToOne(() => Status, {
    nullable: false,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  status: Status;

  @ManyToMany(() => Attack, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  attacks: Attack[];

  @ManyToOne(() => Sprite, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  sprite: Sprite;
}
