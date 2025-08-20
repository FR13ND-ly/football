import { Component, input } from '@angular/core';
import { ShirtComponent } from '../shirt/shirt.component';

@Component({
  selector: 'goal-event',
  standalone: true,
  imports: [ShirtComponent],
  templateUrl: './goal-event.component.html',
  styleUrl: './goal-event.component.scss'
})
export class GoalEventComponent {
  goal: any = input()
  game: any = input()
}
