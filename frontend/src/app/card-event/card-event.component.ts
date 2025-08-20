import { Component, input } from '@angular/core';
import { ShirtComponent } from '../shirt/shirt.component';

@Component({
  selector: 'card-event',
  standalone: true,
  imports: [ShirtComponent],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.scss'
})
export class CardEventComponent {
  card: any = input()
  game: any = input()
}
