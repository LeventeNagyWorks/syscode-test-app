import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../models/address.model';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">{{ isEditMode ? 'Edit Address' : 'Add New Address' }}</h1>
        </div>

        <div *ngIf="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>

        <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>

        <form [formGroup]="addressForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input 
              type="text" 
              id="address" 
              formControlName="address" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              [ngClass]="{'border-red-500': submitted && f['address'].errors}"
            >
            <div *ngIf="submitted && f['address'].errors" class="mt-1 text-sm text-red-600">
              <div *ngIf="f['address'].errors['required']">Address is required</div>
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
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;
  isEditMode = false;
  addressId = '';
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    this.addressId = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = !!this.addressId;
    
    if (this.isEditMode) {
      this.loadAddress();
    }
  }

  get f() { 
    return this.addressForm.controls; 
  }

  initForm(): void {
    this.addressForm = this.formBuilder.group({
      address: ['', [Validators.required]]
    });
  }

  loadAddress(): void {
    this.loading = true;
    this.addressService.getAddress(this.addressId).subscribe({
      next: (address) => {
        this.addressForm.patchValue({
          address: address.address
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load address. Please try again later.';
        console.error('Error loading address:', err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addressForm.invalid) {
      return;
    }

    this.loading = true;
    
    const addressData = {
      address: this.addressForm.value.address
    };

    if (this.isEditMode) {
      this.addressService.updateAddress(this.addressId, addressData).subscribe({
        next: () => {
          this.router.navigate(['/addresses']);
        },
        error: (err) => {
          this.error = 'Failed to update address. Please try again later.';
          console.error('Error updating address:', err);
          this.loading = false;
        }
      });
    } else {
      this.addressService.createAddress(addressData).subscribe({
        next: () => {
          this.router.navigate(['/addresses']);
        },
        error: (err) => {
          this.error = 'Failed to create address. Please try again later.';
          console.error('Error creating address:', err);
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/addresses']);
  }
}