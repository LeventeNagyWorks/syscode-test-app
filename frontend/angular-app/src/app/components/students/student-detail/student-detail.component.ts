import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { AddressService } from '../../../services/address.service';
import { Student } from '../../../models/student.model';
import { Address } from '../../../models/address.model';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">Student Details</h1>
          <div>
            <button 
              (click)="goBack()" 
              class="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back
            </button>
            <a 
              [routerLink]="['/students', studentId, 'edit']" 
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </a>
          </div>
        </div>

        <div *ngIf="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>

        <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>

        <div *ngIf="student" class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Student Information</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and address.</p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">ID</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ student.id }}</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Full name</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ student.name }}</dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ student.email }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div *ngIf="address" class="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Address Information</h3>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ address.address }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div *ngIf="!address && !addressLoading && student" class="mt-6">
          <p class="text-gray-500">No address information available.</p>
        </div>
      </div>
    </div>
  `,
})
export class StudentDetailComponent implements OnInit {
  studentId = '';
  student: Student | null = null;
  address: Address | null = null;
  loading = false;
  addressLoading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    if (this.studentId) {
      this.loadStudent();
      this.loadAddress();
    } else {
      this.error = 'Student ID is required';
    }
  }

  loadStudent(): void {
    this.loading = true;
    this.studentService.getStudent(this.studentId).subscribe({
      next: (data) => {
        this.student = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load student. Please try again later.';
        console.error('Error loading student:', err);
        this.loading = false;
      }
    });
  }

  loadAddress(): void {
    this.addressLoading = true;
    
    // Use the student ID as the profile ID to fetch the address
    this.addressService.getAddressByProfileId(this.studentId).subscribe({
      next: (data) => {
        this.address = data;
        this.addressLoading = false;
      },
      error: (err) => {
        console.error('Error loading address:', err);
        this.addressLoading = false;
        // Not setting error here as address might not exist for all students
      }
    });
  }  

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
