import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, IsActiveMatchOptions } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-btn',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <a
      [routerLink]="route"
      routerLinkActive="bg-gray-900"
      [routerLinkActiveOptions]="routerLinkActiveOptions"
      class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
    >
      {{ text }}
    </a>
  `,
})
export class NavbarBtnComponent {
  @Input() route: string = '/';
  @Input() text: string = 'Link';
  @Input() exact: boolean = false;
  
  get routerLinkActiveOptions(): IsActiveMatchOptions {
    return {
      matrixParams: 'exact',
      queryParams: 'exact',
      paths: this.exact ? 'exact' : 'subset',
      fragment: 'exact'
    };
  }
}
