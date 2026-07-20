import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Task } from './task/task.entity';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [AppController],
  providers: [TaskService],
})
export class AppModule {}
