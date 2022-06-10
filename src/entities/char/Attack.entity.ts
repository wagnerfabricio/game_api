import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity("attacks")
export class Attack {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  power: number;

  @Column()
  accuracy: number;

  @Column()
  hits: number;

  @Column()
  type: string;
}
