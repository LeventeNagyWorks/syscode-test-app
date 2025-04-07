import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimaryBtnComponent } from '../primary-btn';
import { SecondaryBtnComponent } from "../secondary-btn";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PrimaryBtnComponent, SecondaryBtnComponent],
  template: `
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base font-semibold text-accent tracking-wide uppercase">Student Management System</h2>
          <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Manage Students and Addresses</p>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">A simple application to demonstrate CRUD operations with microservices.</p>
          <div class="mt-8 flex justify-center">
            <div class="inline-flex rounded-md shadow">
              <app-primary-btn
                text="View Students"
                route="/students"
              ></app-primary-btn>
            </div>
            <div class="ml-3 inline-flex">
              <app-secondary-btn
                text="View Addresses"
                route="/addresses"
              ></app-secondary-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
