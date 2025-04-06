import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { NotFoundException } from '@nestjs/common';

describe('StudentService', () => {
  let service: StudentService;
  let repository: Repository<Student>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repository = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto = { name: 'John Doe', email: 'john@example.com' };
      const student = { id: 'uuid', ...createStudentDto };
      
      mockRepository.create.mockReturnValue(student);
      mockRepository.save.mockResolvedValue(student);
      expect(await service.create(createStudentDto)).toEqual(student);
      expect(mockRepository.create).toHaveBeenCalledWith(createStudentDto);
      expect(mockRepository.save).toHaveBeenCalledWith(student);
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const students = [
        { id: 'uuid1', name: 'John Doe', email: 'john@example.com' },
        { id: 'uuid2', name: 'Jane Doe', email: 'jane@example.com' },
      ];
      mockRepository.find.mockResolvedValue(students);
      expect(await service.findAll()).toEqual(students);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a student when found', async () => {
      const student = { id: 'uuid', name: 'John Doe', email: 'john@example.com' };
      mockRepository.findOne.mockResolvedValue(student);
      expect(await service.findOne('uuid')).toEqual(student);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid' } });
    });

    it('should throw NotFoundException when student not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('uuid')).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid' } });
    });
  });

  describe('update', () => {
    it('should update a student when found', async () => {
      const student = { id: 'uuid', name: 'John Doe', email: 'john@example.com' };
      const updateStudentDto = { name: 'John Updated' };
      const updatedStudent = { ...student, ...updateStudentDto };
      
      mockRepository.findOne.mockResolvedValue(student);
      mockRepository.save.mockResolvedValue(updatedStudent);
      expect(await service.update('uuid', updateStudentDto)).toEqual(updatedStudent);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid' } });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedStudent);
    });

    it('should throw NotFoundException when student not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.update('uuid', { name: 'John Updated' })).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid' } });
    });
  });

  describe('remove', () => {
    it('should remove a student when found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });
      await service.remove('uuid');
      expect(mockRepository.delete).toHaveBeenCalledWith('uuid');
    });

    it('should throw NotFoundException when student not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove('uuid')).rejects.toThrow(NotFoundException);
      expect(mockRepository.delete).toHaveBeenCalledWith('uuid');
    });
  });
});