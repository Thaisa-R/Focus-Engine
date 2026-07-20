import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TaskStatus {
  PENDENTE = 'Pendente',
  EM_ANDAMENTO = 'Em andamento',
  CONCLUIDO = 'Concluído',
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Estudar NestJS e Swagger' })
  @IsString()
  titulo!: string;

  @ApiProperty({ example: 60 })
  @IsNumber()
  tempoEstimado!: number;

  @ApiPropertyOptional({
    enum: TaskStatus,
    // eslint-disable-next-line prettier/prettier
    example: TaskStatus.PENDENTE})
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
