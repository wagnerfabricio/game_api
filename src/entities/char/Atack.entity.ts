import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity("attacks")
export class Attack {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "float" })
  damage: number;

  @Column({ type: "float", default: 0 })
  ressource?: number;
}