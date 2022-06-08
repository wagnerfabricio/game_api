import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Attack, Char } from ".";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Char, (char) => char.category)
  chars: Char[];


  @ManyToMany(() => Attack, { eager: true })
  @JoinTable()
  attacks: Attack[];
}
