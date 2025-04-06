"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const student_controller_1 = require("./student.controller");
const student_service_1 = require("./student.service");
const common_1 = require("@nestjs/common");
describe('StudentController', () => {
    let controller;
    let service;
    const mockStudentService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [student_controller_1.StudentController],
            providers: [
                {
                    provide: student_service_1.StudentService,
                    useValue: mockStudentService,
                },
            ],
        }).compile();
        controller = module.get(student_controller_1.StudentController);
        service = module.get(student_service_1.StudentService);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('create', () => {
        it('should create a new student', async () => {
            const createStudentDto = {
                name: 'John Doe',
                email: 'john@example.com',
            };
            const student = Object.assign({ id: 'uuid' }, createStudentDto);
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
            mockStudentService.findOne.mockRejectedValue(new common_1.NotFoundException());
            await expect(controller.findOne('uuid')).rejects.toThrow(common_1.NotFoundException);
            expect(mockStudentService.findOne).toHaveBeenCalledWith('uuid');
        });
    });
    describe('update', () => {
        it('should update a student when found', async () => {
            const updateStudentDto = { name: 'John Updated' };
            const student = { id: 'uuid', name: 'John Doe', email: 'john@example.com' };
            const updatedStudent = Object.assign(Object.assign({}, student), updateStudentDto);
            mockStudentService.update.mockResolvedValue(updatedStudent);
            expect(await controller.update('uuid', updateStudentDto)).toEqual(updatedStudent);
            expect(mockStudentService.update).toHaveBeenCalledWith('uuid', updateStudentDto);
        });
        it('should throw NotFoundException when student not found', async () => {
            mockStudentService.update.mockRejectedValue(new common_1.NotFoundException());
            await expect(controller.update('uuid', { name: 'John Updated' })).rejects.toThrow(common_1.NotFoundException);
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
            mockStudentService.remove.mockRejectedValue(new common_1.NotFoundException());
            await expect(controller.remove('uuid')).rejects.toThrow(common_1.NotFoundException);
            expect(mockStudentService.remove).toHaveBeenCalledWith('uuid');
        });
    });
});
//# sourceMappingURL=student.controller.spec.js.map