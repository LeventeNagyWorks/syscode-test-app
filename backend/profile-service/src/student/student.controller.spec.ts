import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { NotFoundException } from '@nestjs/common';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  const mockStudentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      const student = { id: 'uuid', ...createStudentDto };
      
      mockStudentService.create.mockResolvedValue(student);
      expect(await controller.create(createStudentDto)).toEqual(student);
      expect(mockStudentService.create).toHaveBeenCalledWith(createStudentDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const students = [
        { id: 'uuid1', name: 'John Doe', email: 'john@example.com' },
        { id: 'uuid2', name: 'Jane Doe', email: 'jane@example.com' },
      ];
      mockStudentService.findAll.mockResolvedValue(students);
      expect(await controller.findAll()).toEqual(students);
      expect(mockStudentService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a student when found', async () => {
      const student = { id: 'uuid', name: 'John Doe', email: 'john@example.com' };
      mockStudentService.findOne.mockResolvedValue(student);
      expect(await controller.findOne('uuid')).toEqual(student);
      expect(mockStudentService.findOne).toHaveBeenCalledWith('uuid');
    });

    it('should throw NotFoundException when student not found', async () => {
      mockStudentService.findOne.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('uuid')).rejects.toThrow(NotFoundException);
      expect(mockStudentService.findOne).toHaveBeenCalledWith('uuid');
    });
  });

  describe('update', () => {
    it('should update a student when found', async () => {
      const updateStudentDto: UpdateStudentDto = { name: 'John Updated' };
      const student = { id: 'uuid', name: 'John Doe', email: 'john@example.com' };
      const updatedStudent = { ...student, ...updateStudentDto };
      
      mockStudentService.update.mockResolvedValue(updatedStudent);
      expect(await controller.update('uuid', updateStudentDto)).toEqual(updatedStudent);
      expect(mockStudentService.update).toHaveBeenCalledWith('uuid', updateStudentDto);
    });

    it('should throw NotFoundException when student not found', async () => {
      mockStudentService.update.mockRejectedValue(new NotFoundException());
      await expect(controller.update('uuid', { name: 'John Updated' })).rejects.toThrow(NotFoundException);
      expect(mockStudentService.update).toHaveBeenCalledWith('uuid', { name: 'John Updated' });
    });
  });

  describe('remove', () => {
    it('should remove a student when found', async () => {
      mockStudentService.remove.mockResolvedValue(undefined);
      await expect(controller.remove('uuid')).resolves.toBeUndefined();
      expect(mockStudentService.remove).toHaveBeenCalledWith('uuid');
    });

    it('should throw NotFoundException when student not found', async () => {
      mockStudentService.remove.mockRejectedValue(new NotFoundException());
      await expect(controller.remove('uuid')).rejects.toThrow(NotFoundException);
      expect(mockStudentService.remove).toHaveBeenCalledWith('uuid');
    });
  });
});