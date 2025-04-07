import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';
import { PaginationComponent } from '../../pagination.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent, ConfirmationDialogComponent],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">Students</h1>
          <a
            routerLink="/students/new"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
          <app-pagination
            *ngIf="totalItems > 0"
            [currentPage]="currentPage"
            [pageSize]="pageSize"
            [totalItems]="totalItems"
            (pageChange)="onPageChange($event)">
          </app-pagination>
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
                  <a [routerLink]="['/students', student.id]" class="text-accent hover:text-indigo-900 mr-4">View</a>
                  <a [routerLink]="['/students', student.id, 'edit']" class="text-accent hover:text-indigo-900 mr-4">Edit</a>
                  <button (click)="openDeleteConfirmation(student.id, student.name)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div *ngIf="!loading && students.length === 0" class="text-center py-10">
            <p class="text-gray-500">No students found. Add a new student to get started.</p>
          </div>
          
          <app-pagination
            *ngIf="totalItems > 0"
            [currentPage]="currentPage"
            [pageSize]="pageSize"
            [totalItems]="totalItems"
            (pageChange)="onPageChange($event)">
          </app-pagination>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <app-confirmation-dialog
      [isOpen]="showDeleteConfirmation"
      [title]="'Delete Student'"
      [message]="deleteConfirmationMessage"
      [confirmButtonText]="'Delete'"
      [cancelButtonText]="'Cancel'"
      (confirmed)="confirmDelete()"
      (cancelled)="cancelDelete()">
    </app-confirmation-dialog>
  `,
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error = '';
  currentPage = 1;
  pageSize = 100;
  totalItems = 0;
  // For delete confirmation dialog
  showDeleteConfirmation = false;
  studentToDelete: string | null = null;
  deleteConfirmationMessage = '';

  constructor(
    private studentService: StudentService,
    private toastService: ToastService // Injektáljuk a ToastService-t
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadTotalCount();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getStudents(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load students. Please try again later.';
        console.error('Error loading students:', err);
        this.loading = false;
        this.toastService.error('Failed to load students. Please try again later.'); // Toast hibaüzenet
      }
    });
  }

  loadTotalCount(): void {
    this.studentService.getStudentCount().subscribe({
      next: (count) => {
        this.totalItems = count;
      },
      error: (err) => {
        console.error('Error loading student count:', err);
        this.toastService.error('Failed to load student count.'); // Toast hibaüzenet
      }
    });
  }

  openDeleteConfirmation(id: string, name: string): void {
    this.studentToDelete = id;
    this.deleteConfirmationMessage = `Are you sure you want to delete the student "${name}"? This action cannot be undone.`;
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    if (this.studentToDelete) {
      const idToDelete = this.studentToDelete;
      const studentName = this.students.find(s => s.id === idToDelete)?.name || 'Student';
      this.studentToDelete = null;
      this.showDeleteConfirmation = false; // Make sure to close the dialog
      
      this.studentService.deleteStudent(idToDelete).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== idToDelete);
          this.totalItems--;
          // If we deleted the last item on the page, go to previous page
          if (this.students.length === 0 && this.currentPage > 1) {
            this.onPageChange(this.currentPage - 1);
          } else {
            // Reload current page to ensure we have the right number of items
            this.loadStudents();
          }
          this.toastService.success(`Student "${studentName}" has been deleted successfully.`); // Sikeres törlés toast
        },
        error: (err) => {
          this.error = 'Failed to delete student. Please try again later.';
          console.error('Error deleting student:', err);
          this.toastService.error('Failed to delete student. Please try again later.'); // Sikertelen törlés toast
        }
      });
    }
  }
 
  cancelDelete(): void {
    this.studentToDelete = null;
    this.showDeleteConfirmation = false; // Make sure to close the dialog
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadStudents();
    // Scroll to top of the page for better UX
    window.scrollTo(0, 0);
  }
}
