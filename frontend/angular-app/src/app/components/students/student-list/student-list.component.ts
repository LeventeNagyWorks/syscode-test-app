import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">Students</h1>
          <a routerLink="/students/new" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Student
          </a>
        </div>

        <div *ngIf="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>

        <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>

        <div class="overflow-x-auto">
          <table *ngIf="students.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let student of students">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ student.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ student.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a [routerLink]="['/students', student.id]" class="text-indigo-600 hover:text-indigo-900 mr-4">View</a>
                  <a [routerLink]="['/students', student.id, 'edit']" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                  <button (click)="deleteStudent(student.id)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div *ngIf="!loading && students.length === 0" class="text-center py-10">
            <p class="text-gray-500">No students found. Add a new student to get started.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load students. Please try again later.';
        console.error('Error loading students:', err);
        this.loading = false;
      }
    });
  }

  deleteStudent(id: string): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== id);
        },
        error: (err) => {
          this.error = 'Failed to delete student. Please try again later.';
          console.error('Error deleting student:', err);
        }
      });
    }
  }
}
