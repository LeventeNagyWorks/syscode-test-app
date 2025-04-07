import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('students')
export class Student {
  @ApiProperty({ example: 'uuid', description: 'The unique identifier of the student' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the student' })
  @Column()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the student' })
  @Column({ unique: true })
  email: string;
}