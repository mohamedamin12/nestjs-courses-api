import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CURRENT_TIMESTAMP } from 'utils/constants';
import { UserType } from 'utils/enum';
import { Course } from 'src/courses/courses.entity';
import { Review } from 'src/reviews/reviews.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '150', nullable: true })
  username: string;

  @Column({ type: 'varchar', length: '250', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  profileImage: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.Student })
  role: UserType;

  @Column({ default: false })
  isAccountVerified: boolean;

  @Column({ nullable: true })
  verifictionToken: string;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => Review, (review) => review.student)
  reviews: Review[];
}
