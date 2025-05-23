import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'The student has been successfully created', type: Student })
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Return all students', type: [Student] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100
  ): Promise<Student[]> {
    return this.studentService.findAll(page, limit);
  }

  @Get('count')
  @ApiOperation({ summary: 'Get total count of students' })
  @ApiResponse({ status: 200, description: 'Return the total count of students', type: Number })
  count(): Promise<number> {
    return this.studentService.count();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by id' })
  @ApiResponse({ status: 200, description: 'Return a student by id', type: Student })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a student' })
  @ApiResponse({ status: 200, description: 'The student has been successfully updated', type: Student })
  @ApiResponse({ status: 404, description: 'Student not found' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student' })
  @ApiResponse({ status: 200, description: 'The student has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.studentService.remove(id);
  }
}
