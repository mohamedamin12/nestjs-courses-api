import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./courses.entity";
import { CourseController } from "./courses.controller";
import { CourseService } from "./courses.service";

@Module({
  controllers:[CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([Course])
  ],
})
export class CourseModule {}