import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./courses.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Course])
  ],
})
export class CourseModule {}