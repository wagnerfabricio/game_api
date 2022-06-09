import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Category } from "./";

@Entity("chars")
export class Char {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "float" })
  life: number;

  @Column({ type: "float", name: "current_life" })
  currentLife: number;

  @Column({ type: "float" })
  ressource: number;

  @Column({ type: "float", name: "current_ressource" })
  currentRessource: number;

  @Column({ type: "float" })
  defence: number;

  @Column({ type: "float", default: 1 })
  level?: number;

  @ManyToOne(() => Category, (category) => category.chars, {
    eager: true,
    cascade: true,
  })
  category: Category;
}
