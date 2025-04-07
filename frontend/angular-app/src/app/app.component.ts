import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ToastComponent],
  template: `
    <div class="min-h-screen bg-white selection:text-white selection:bg-indigo-500 relative overflow-hidden">
      <!-- Navigation Header -->
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex w-full justify-between h-16">
            <div class="flex w-full">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-indigo-600">{{ title }}</h1>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  routerLink="/"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  [routerLinkActiveOptions]="{exact: true}"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </a>
                <a
                  routerLink="/students"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Students
                </a>
                <a
                  routerLink="/addresses"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Addresses
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Main Content -->
      <div class="py-6 bg-white relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          <router-outlet />
          <app-toast></app-toast>
        </div>
      </div>
      
      <!-- Wave SVGs - Only shown on home route -->
      <ng-container *ngIf="isHomeRoute">
        <div class="absolute bottom-0 left-0 w-full overflow-hidden" style="z-index: 1;">
          
          <!-- Angular logo  -->
          <div>

          </div>
          <!-- Node logo  -->
          <div>

          </div>
          
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden" style="z-index: 1;">
          <!-- Wave 1 - Lightest indigo -->
          <svg class="w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="#c7d2fe" 
              opacity="0.8"
            ></path>
          </svg>
        </div>
        
        <div class="absolute bottom-0 left-0 w-full overflow-hidden" style="z-index: 2;">
          <!-- Wave 2 - Medium indigo -->
          <svg class="w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,197.3C672,213,768,235,864,229.3C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="#a5b4fc" 
              opacity="0.7"
            ></path>
          </svg>
        </div>
        
        <div class="absolute bottom-0 left-0 w-full overflow-hidden" style="z-index: 3;">
          <!-- Wave 3 - Darkest indigo -->
          <svg class="w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,176C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="#4f46e5" 
              opacity="0.6"
            ></path>
          </svg>
        </div>
      </ng-container>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = 'Address Manager';
  isHomeRoute = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHomeRoute = event.urlAfterRedirects === '/';
    });

    this.isHomeRoute = this.router.url === '/';
  }
}
