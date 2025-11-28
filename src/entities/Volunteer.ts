import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Volunteer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column("text", { nullable: true })
  message?: string;

  @CreateDateColumn()
  dateSubmitted!: Date;
}
