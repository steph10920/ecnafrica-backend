import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column("decimal", { precision: 12, scale: 2 })
  amount!: number;

  @Column("text", { nullable: true })
  message?: string;

  @CreateDateColumn()
  dateSubmitted!: Date;
}
