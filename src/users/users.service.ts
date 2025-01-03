import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Get All users
   * @returns collection of users
   */
  findAll() {
    return this.userRepository.find();
  }

  /**
   * Get user (logged in user)
   * @param id user id for the logged in user
   * @returns the user from the database
   */
  async getMe(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  /**
   * Create a new user
   * @param body - the body of the request object
   * @returns - the new user
   */
  async Create(body: CreateUserDto) {
    const user = await this.userRepository.create(body);
    await this.userRepository.save(user);
    return user;
  }

  /**
   * Update user
   * @param id id of the logged in user
   * @param updateDto data for the update user
   * @returns update user from the database
   */
  async update(id: number, updateDto: updateUserDto) {
    const user = await this.getMe(id);
    this.userRepository.merge(user, updateDto);
    await this.userRepository.save(user);
    return user;
  }

  /**
   * Delete user
   * @param id id of the user to delete
   * @returns success message
   */
  async delete(id: number) {
    const user = await this.getMe(id);
    await this.userRepository.remove(user);
    return  { message : 'User deleted successfully'};
  }

}
