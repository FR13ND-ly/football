import { Component, input } from '@angular/core';
import { ShirtComponent } from '../shirt/shirt.component';
import { FileNamePipe } from '../file-name.pipe';

@Component({
  selector: 'goal-event',
  standalone: true,
  imports: [ShirtComponent, FileNamePipe],
  templateUrl: './goal-event.component.html',
  styleUrl: './goal-event.component.scss'
})
export class GoalEventComponent {
  goal: any = input()
  game: any = input()
}
