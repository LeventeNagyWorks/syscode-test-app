import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      // Manually generate a UUID
      const student = this.studentRepository.create({
        ...createStudentDto,
        id: uuidv4() // Generate UUID
      });
      return await this.studentRepository.save(student);
    } catch (error) {
      this.logger.error(`Failed to create student: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 100): Promise<Student[]> {
    try {
      const skip = (page - 1) * limit;
      return await this.studentRepository.find({
        skip,
        take: limit,
        order: { id: 'ASC' } // Rendezés ID szerint, hogy konzisztens legyen a lapozás
      });
    } catch (error) {
      this.logger.error(`Failed to find all students: ${error.message}`, error.stack);
      throw error;
    }
  }

  async count(): Promise<number> {
    try {
      return await this.studentRepository.count();
    } catch (error) {
      this.logger.error(`Failed to count students: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });
      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      return student;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(`Failed to find student with id ${id}: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    try {
      const student = await this.findOne(id);
      const updatedStudent = { ...student, ...updateStudentDto };
      return await this.studentRepository.save(updatedStudent);
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(`Failed to update student with id ${id}: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.studentRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(`Failed to remove student with id ${id}: ${error.message}`, error.stack);
      }
      throw error;
    }
  }
}
