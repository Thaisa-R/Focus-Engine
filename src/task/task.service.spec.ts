import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

describe('TaskService', () => {
  let service: TaskService;

  const mockTaskRepository = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((task) => Promise.resolve({ id: 1, ...task })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      titulo: 'Tarefa Teste',
      tempoEstimado: 30,
      status: 'Pendente',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });
});
