"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const student_service_1 = require("./student.service");
const student_entity_1 = require("./entities/student.entity");
const common_1 = require("@nestjs/common");
describe('StudentService', () => {
    let service;
    let repository;
    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                student_service_1.StudentService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(student_entity_1.Student),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(student_service_1.StudentService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(student_entity_1.Student));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new student', async () => {
            const createStudentDto = { name: 'John Doe', email: 'john@example.com' };
            const student = Object.assign({ id: 'uuid' }, createStudentDto);
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
            await expect(service.findOne('uuid')).rejects.toThrow(common_1.NotFoundException);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid' } });
        });
    });
    describe('update', () => {
        it('should update a student when found', async () => {
            const student = { id: 'uuid', name: 'John Doe', email: 'john@example.com' };
            const updateStudentDto = { name: 'John Updated' };
            const updatedStudent = Object.assign(Object.assign({}, student), updateStudentDto);
            mockRepository.findOne.mockResolvedValue(student);
            mockRepository.save.mockResolvedValue(updatedStudent);
            expect(await service.update('uuid', updateStudentDto)).toEqual(updatedStudent);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid' } });
            expect(mockRepository.save).toHaveBeenCalledWith(updatedStudent);
        });
        it('should throw NotFoundException when student not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);
            await expect(service.update('uuid', { name: 'John Updated' })).rejects.toThrow(common_1.NotFoundException);
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
            await expect(service.remove('uuid')).rejects.toThrow(common_1.NotFoundException);
            expect(mockRepository.delete).toHaveBeenCalledWith('uuid');
        });
    });
});
//# sourceMappingURL=student.service.spec.js.map