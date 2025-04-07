import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast.component';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastComponent, NavbarComponent],
  template: `
    <div class="min-h-screen bg-white selection:text-white selection:bg-indigo-500 relative overflow-hidden">
      <!-- Navigation Header -->
      <app-navbar></app-navbar>
      
      <!-- Main Content -->
      <div class="py-6 bg-white relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          <router-outlet />
          <app-toast></app-toast>
        </div>
      </div>
      
      <ng-container *ngIf="isHomeRoute">
        <div class="absolute bottom-[30px] sm:bottom-[100px] lg:bottom-[150px] z-10 w-full">

          <div class="absolute left-10 bottom-10 transform -rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" class="w-32 h-32 md:w-48 md:h-48">
              <path fill="#DD0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/>
              <path fill="#C3002F" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z"/>
              <path fill="#FFFFFF" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/>
            </svg>
          </div>

          <!-- Módosított kód a vectorlogo.zone Node.js SVG logóval -->
          <div class="absolute right-10 bottom-20 transform rotate-12 opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-32 h-32 md:w-48 md:h-48">
              <path fill="#689f63" d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z"/>
            </svg>
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
