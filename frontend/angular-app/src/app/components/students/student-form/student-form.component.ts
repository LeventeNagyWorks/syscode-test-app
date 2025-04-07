import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">{{ isEditMode ? 'Edit Student' : 'Add New Student' }}</h1>
        </div>

        <div *ngIf="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>

        <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>

        <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name" 
              class="mt-1 block w-full rounded-md border-gray-300 outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:text-md sm:text-sm px-2 py-2"
              [ngClass]="{'border-red-500': submitted && f['name'].errors}"
            >
            <div *ngIf="submitted && f['name'].errors" class="mt-1 text-sm text-red-600">
              <div *ngIf="f['name'].errors['required']">Name is required</div>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              class="mt-1 block w-full rounded-md border-gray-300 outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:text-md sm:text-sm px-2 py-2"
              [ngClass]="{'border-red-500': submitted && f['email'].errors}"
            >
            <div *ngIf="submitted && f['email'].errors" class="mt-1 text-sm text-red-600">
              <div *ngIf="f['email'].errors['required']">Email is required</div>
              <div *ngIf="f['email'].errors['email']">Email must be a valid email address</div>
            </div>
          </div>

          <div class="flex justify-between">
            <button 
              type="button" 
              (click)="goBack()" 
              class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              [disabled]="loading"
            >
              {{ isEditMode ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId = '';
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private toastService: ToastService // Injektáljuk a ToastService-t
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = !!this.studentId;
    
    if (this.isEditMode) {
      this.loadStudent();
    }
  }

  get f() {
    return this.studentForm.controls;
  }

  initForm(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  loadStudent(): void {
    this.loading = true;
    this.studentService.getStudent(this.studentId).subscribe({
      next: (student) => {
        this.studentForm.patchValue({
          name: student.name,
          email: student.email
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load student. Please try again later.';
        console.error('Error loading student:', err);
        this.loading = false;
        this.toastService.error('Failed to load student. Please try again later.'); // Toast hibaüzenet
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentForm.invalid) {
      return;
    }

    this.loading = true;
    
    const studentData = {
      name: this.studentForm.value.name,
      email: this.studentForm.value.email
    };

    if (this.isEditMode) {
      this.studentService.updateStudent(this.studentId, studentData).subscribe({
        next: () => {
          this.toastService.success(`Student "${studentData.name}" has been updated successfully.`); // Sikeres frissítés toast
          this.router.navigate(['/students']);
        },
        error: (err) => {
          this.error = 'Failed to update student. Please try again later.';
          console.error('Error updating student:', err);
          this.loading = false;
          this.toastService.error('Failed to update student. Please try again later.'); // Sikertelen frissítés toast
        }
      });
    } else {
      this.studentService.createStudent(studentData).subscribe({
        next: () => {
          this.toastService.success(`Student "${studentData.name}" has been created successfully.`); // Sikeres létrehozás toast
          this.router.navigate(['/students']);
        },
        error: (err) => {
          this.error = 'Failed to create student. Please try again later.';
          console.error('Error creating student:', err);
          this.loading = false;
          this.toastService.error('Failed to create student. Please try again later.'); // Sikertelen létrehozás toast
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}