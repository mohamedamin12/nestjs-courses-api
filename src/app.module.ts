import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { ReviewModule } from './reviews/reviews.module';
import { CourseModule } from './courses/courses.module';
import { Course } from './courses/courses.entity';
import { User } from './users/users.entity';
import { Review } from './reviews/reviews.entity';


@Module({
  imports: [
    UserModule,
    ReviewModule,
    CourseModule,
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (config : ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: config.get<number>("DB_PORT"),
          username: config.get<string>("DB_USERNAME"),
          password: config.get<string>("DB_PASSWORD"),
          database: config.get<string>("DB_NAME"),
          synchronize: process.env.NODE_ENV !== 'production',
          entities:[Course , User , Review]
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development'
    })
  ],
})
export class AppModule {}
