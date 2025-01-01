import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dtos/create-course.dto';

@Controller('api/courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  //* GET ~/api/courses
  @Get()
  getAllCourses() {
    return this.courseService.findAll();
  }

  //* GET ~/api/courses/:id
  @Get(':id')
  getCourseById(@Param('id') id: number) {
    return this.courseService.getById(id);
  }

  //* POST ~/api/courses
  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  //* PUT ~/api/courses/:id
  @Put(':id')
  updateCourse(
    @Param('id') id: number,
    @Body() updateCourseDto: CreateCourseDto,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  //* DELETE ~/api/courses/:id
  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.courseService.delete(id);
  }
}
