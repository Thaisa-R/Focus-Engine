import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TaskService } from './task/task.service';

describe('AppController', () => {
  let appController: AppController;

  const mockTaskService = {
    create: jest.fn().mockResolvedValue({ id: 1, titulo: 'Tarefa Teste' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, titulo: 'Tarefa Teste' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, titulo: 'Tarefa Teste' }),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
