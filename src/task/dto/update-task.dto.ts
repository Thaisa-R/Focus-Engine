import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Estudar NestJS Avançado' })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiPropertyOptional({ example: 45 })
  @IsNumber()
  @IsOptional()
  tempoEstimado?: number;

  @ApiPropertyOptional({
    enum: TaskStatus,
    // eslint-disable-next-line prettier/prettier
    example: TaskStatus.CONCLUIDO
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
