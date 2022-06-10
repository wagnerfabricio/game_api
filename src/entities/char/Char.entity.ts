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

  @Column({ nullable: true })
  token: string;

  @OneToOne(() => Status, {
    nullable: false,
    cascade: true,
    eager: true,
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
    nullable: false,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  sprite: Sprite;
}
