import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  location!: string;

  @Column()
  type!: string;

  @Column({ nullable: true })
  salaryRange!: string;

  @Column("text")
  aboutRole!: string;

  @Column("simple-array")
  responsibilities!: string[]; // stored as comma separated values

  @Column("simple-array")
  qualifications!: string[];

  @Column()
  apply!: string;

  @Column({ type: "date", nullable: true })
  closingDate?: string;

  @CreateDateColumn()
  datePosted!: Date;
}
