import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-btn',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <a
      [routerLink]="route"
      routerLinkActive="border-accent border-2 text-accent "
      [routerLinkActiveOptions]="{exact: exact}"
      class="px-3 py-2 rounded-md text-sm font-medium  hover:text-white hover:bg-accent"
    >
      {{ text }}
    </a>
  `,
})
export class NavbarBtnComponent {
  @Input() route: string = '/';
  @Input() text: string = 'Link';
  @Input() exact: boolean = false;
}
