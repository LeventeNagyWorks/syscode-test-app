import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-secondary-btn',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="route"
      class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-accent hover:bg-indigo-200"
    >
      {{ text }}
    </a>
  `,
})
export class SecondaryBtnComponent {
  @Input() text: string = '';
  @Input() route: string = '';
}
