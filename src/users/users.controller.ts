import { Body, Controller, Get , Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";



@Controller('api/users/')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  //* GET ~/api/users
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  //! GET ~/api/users/get-me


  //* Post ~/api/users
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.Create(createUserDto);
  }

  //! PUT ~/api/users/:id

  //! Delete ~/api/users/:id

}