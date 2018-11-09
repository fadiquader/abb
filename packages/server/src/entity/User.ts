import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert
} from "typeorm";
import {Listing} from "./Listing";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {length: 255})
  email: string;

  @Column("varchar", {length: 255})
  password: string;

  @Column("boolean", {default: false})
  confirmed: boolean;

  @Column("boolean", {default: false})
  forgotPasswordLocked: boolean;

  @OneToMany(() => Listing, listing => listing.user)
  listings: Listing[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
