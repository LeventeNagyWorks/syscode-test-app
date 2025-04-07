"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StudentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./entities/student.entity");
const uuid_1 = require("uuid");
let StudentService = StudentService_1 = class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
        this.logger = new common_1.Logger(StudentService_1.name);
    }
    async create(createStudentDto) {
        try {
            const student = this.studentRepository.create(Object.assign(Object.assign({}, createStudentDto), { id: (0, uuid_1.v4)() }));
            return await this.studentRepository.save(student);
        }
        catch (error) {
            this.logger.error(`Failed to create student: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll(page = 1, limit = 100) {
        try {
            const skip = (page - 1) * limit;
            return await this.studentRepository.find({
                skip,
                take: limit,
                order: { id: 'ASC' }
            });
        }
        catch (error) {
            this.logger.error(`Failed to find all students: ${error.message}`, error.stack);
            throw error;
        }
    }
    async count() {
        try {
            return await this.studentRepository.count();
        }
        catch (error) {
            this.logger.error(`Failed to count students: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const student = await this.studentRepository.findOne({ where: { id } });
            if (!student) {
                throw new common_1.NotFoundException(`Student with ID ${id} not found`);
            }
            return student;
        }
        catch (error) {
            if (!(error instanceof common_1.NotFoundException)) {
                this.logger.error(`Failed to find student with id ${id}: ${error.message}`, error.stack);
            }
            throw error;
        }
    }
    async update(id, updateStudentDto) {
        try {
            const student = await this.findOne(id);
            const updatedStudent = Object.assign(Object.assign({}, student), updateStudentDto);
            return await this.studentRepository.save(updatedStudent);
        }
        catch (error) {
            if (!(error instanceof common_1.NotFoundException)) {
                this.logger.error(`Failed to update student with id ${id}: ${error.message}`, error.stack);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            const result = await this.studentRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Student with ID ${id} not found`);
            }
        }
        catch (error) {
            if (!(error instanceof common_1.NotFoundException)) {
                this.logger.error(`Failed to remove student with id ${id}: ${error.message}`, error.stack);
            }
            throw error;
        }
    }
};
StudentService = StudentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map