import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-primary-btn',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="route"
      class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-indigo-500 hover:shadow-[0_0_48px_rgba(79,57,246,0.8)]"
    >
      {{ text }}
    </a>
  `,
})
export class PrimaryBtnComponent {
  @Input() text: string = '';
  @Input() route: string = '';
}
