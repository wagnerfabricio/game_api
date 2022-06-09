import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./";

@Entity("attacks")
export class Attack {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "float" })
  damage: number;

  @Column({ type: "float", default: 0 })
  resource?: number;

  @ManyToMany(() => Category, (category) => category.attacks)
  categories: Category[];
}
