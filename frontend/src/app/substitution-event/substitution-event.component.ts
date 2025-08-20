import { Component, input } from '@angular/core';
import { ShirtComponent } from '../shirt/shirt.component';

@Component({
  selector: 'substitution-event',
  standalone: true,
  imports: [ShirtComponent],
  templateUrl: './substitution-event.component.html',
  styleUrl: './substitution-event.component.scss'
})
export class SubstitutionEventComponent {
  substitution: any = input()
  game: any = input()
}
