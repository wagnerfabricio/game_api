import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sprites")
export class Sprite {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  key: string;

  @Column()
  url: string;
}
