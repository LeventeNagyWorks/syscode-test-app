import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the student' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the student' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}