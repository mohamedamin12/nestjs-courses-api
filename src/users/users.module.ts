import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User])
  ],
})
export class UserModule {}