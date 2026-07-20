import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { TaskService } from './task/task.service';
import { CreateTaskDto } from './task/dto/create-task.dto';
import { UpdateTaskDto } from './task/dto/update-task.dto';

@Controller('tarefas')
export class AppController {
  constructor(private readonly taskService: TaskService) {}

  @Get('health')
  getHealth() {
    return {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'FocusEngine API',
    };
  }

  @Post()
  @ApiBody({ type: CreateTaskDto })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.create(createTaskDto);
    return { message: 'Tarefa salva com sucesso!', task };
  }

  @Get()
  async listarTarefas() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTaskDto })
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.taskService.update(id, updateTaskDto);
    return { message: 'Tarefa atualizada com sucesso!' };
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.delete(id);
    return { message: 'Tarefa deletada com sucesso!' };
  }
}
