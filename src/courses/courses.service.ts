import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './courses.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dtos/create-course.dto';
import { updateCourseDto } from './dtos/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  /**
   * Get all courses
   * @returns collection of products  
   */
  async findAll() {
    return await this.coursesRepository.find();
  }

  /**
   * Get course by id
   * @param id - id of the course to get
   * @returns the course
   */
  async getById(id: number){
    const course = await this.coursesRepository.findOne({where: {id}});
    if (!course) {
      throw new NotFoundException(`Course with id "${id}" not found`);
    } 
    return course;
  }

  /**
   * Create a new course
   * @param dto - course data to create
   * @returns the newly created course
   */
  async create(dto : CreateCourseDto){
    const newCourse = this.coursesRepository.create(dto);
    await this.coursesRepository.save(newCourse);
    return newCourse;
  }

  /**
   * Update a Course
   * @param id - id of the course  
   * @param dto Course to update 
   * @returns the course updated 
   */
  async update(id : number, dto : updateCourseDto){
    const course = await this.getById(id);
    this.coursesRepository.merge(course, dto);
    await this.coursesRepository.save(course);
    return course;
  }

  /**
   * delete a course
   * @param id - id of the course  
   * @returns success message
   */
  async delete(id: number) {
    const course = await this.getById(id);
    await this.coursesRepository.remove(course);
    return {message :`Course with id "${id}" has been deleted`};
  }

}
