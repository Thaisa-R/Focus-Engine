import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    return await this.taskRepository.findOneBy({ id });
  }

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async delete(id: number) {
    return await this.taskRepository.delete(id);
  }
}
