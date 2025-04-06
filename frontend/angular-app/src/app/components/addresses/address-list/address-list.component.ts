import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../models/address.model';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">Addresses</h1>
          <a routerLink="/addresses/new" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Address
          </a>
        </div>

        <div *ngIf="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>

        <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>

        <div class="overflow-x-auto">
          <table *ngIf="addresses.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let address of addresses">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ address.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ address.address }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a [routerLink]="['/addresses', address.id]" class="text-indigo-600 hover:text-indigo-900 mr-4">View</a>
                  <a [routerLink]="['/addresses', address.id, 'edit']" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                  <button (click)="deleteAddress(address.id)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div *ngIf="!loading && addresses.length === 0" class="text-center py-10">
            <p class="text-gray-500">No addresses found. Add a new address to get started.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];
  loading = false;
  error = '';

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.loading = true;
    this.addressService.getAddresses().subscribe({
      next: (data) => {
        this.addresses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load addresses. Please try again later.';
        console.error('Error loading addresses:', err);
        this.loading = false;
      }
    });
  }

  deleteAddress(id: string): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe({
        next: () => {
          this.addresses = this.addresses.filter(address => address.id !== id);
        },
        error: (err) => {
          this.error = 'Failed to delete address. Please try again later.';
          console.error('Error deleting address:', err);
        }
      });
    }
  }
}