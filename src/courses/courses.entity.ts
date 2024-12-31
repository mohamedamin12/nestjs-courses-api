import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Review } from 'src/reviews/reviews.entity';


@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => User, (user) => user.courses)
  instructor: User;

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

}