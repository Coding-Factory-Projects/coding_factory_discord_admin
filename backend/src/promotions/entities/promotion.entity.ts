import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'promotions' })
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  campus: string;

  @Column()
  start_year: number;

  @Column()
  end_year: number;

  @Column({ default: '' })
  discord_role_id: string;

  @Column({ default: false })
  archived: boolean;

  @CreateDateColumn()
  creation_date: Date;

  @OneToMany(() => Student, (student) => student.promotion)
  students: Student[];
}
