import { Component, input } from '@angular/core';
import { ShirtComponent } from '../shirt/shirt.component';
import { FileNamePipe } from '../file-name.pipe';

@Component({
  selector: 'card-event',
  standalone: true,
  imports: [ShirtComponent, FileNamePipe],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.scss'
})
export class CardEventComponent {
  card: any = input()
  game: any = input()
}
