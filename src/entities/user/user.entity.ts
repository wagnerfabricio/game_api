import { compare } from "bcrypt";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Char } from "../char";

// import { char } from "./char.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  adm: boolean;

  @OneToOne(() => Char, (char) => char, { eager: true })
  @JoinColumn()
  char: Char;

  comparePwd = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password);
  };
}
