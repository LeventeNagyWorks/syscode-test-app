import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">Student Management System</h2>
          <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Manage Students and Addresses</p>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">A simple application to demonstrate CRUD operations with microservices.</p>
          <div class="mt-8 flex justify-center">
            <div class="inline-flex rounded-md shadow">
              <a routerLink="/students" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                View Students
              </a>
            </div>
            <div class="ml-3 inline-flex">
              <a routerLink="/addresses" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                View Addresses
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
