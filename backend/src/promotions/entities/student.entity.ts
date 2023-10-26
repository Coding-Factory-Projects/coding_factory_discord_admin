import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from './promotion.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: null })
  discordTag: string | null;

  @JoinColumn()
  @ManyToOne(() => Promotion, (promotion) => promotion.students, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  promotion: Promotion;
}
