import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarBtnComponent } from './navbar-btn.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NavbarBtnComponent],
  template: `
    <nav class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-xl font-bold">Student Management</span>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <app-navbar-btn 
                  route="/" 
                  text="Home" 
                  [exact]="true"
                />
                <app-navbar-btn 
                  route="/students" 
                  text="Students"
                />
                <app-navbar-btn 
                  route="/addresses" 
                  text="Addresses"
                />
              </div>
            </div>
          </div>
          <div class="md:hidden">
            <button (click)="toggleMobileMenu()" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div class="md:hidden" [class.hidden]="!isMobileMenuOpen">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <!-- For mobile, we need a slightly different style, so we'll keep the original links -->
          <a routerLink="/" routerLinkActive="bg-gray-900" [routerLinkActiveOptions]="{exact: true}" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</a>
          <a routerLink="/students" routerLinkActive="bg-gray-900" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Students</a>
          <a routerLink="/addresses" routerLinkActive="bg-gray-900" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Addresses</a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
