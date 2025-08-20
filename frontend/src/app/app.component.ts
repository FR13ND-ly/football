import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { ShirtComponent } from './shirt/shirt.component';
import { DbService } from './db.service';
import { BufferService } from './buffer.service';
import { concatMap, delay, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CardEventComponent } from './card-event/card-event.component';
import { GoalEventComponent } from './goal-event/goal-event.component';
import { SubstitutionEventComponent } from './substitution-event/substitution-event.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShirtComponent, CardEventComponent, GoalEventComponent, SubstitutionEventComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dbService = inject(DbService);
  bufferService = inject(BufferService);

  
  game = this.dbService.game;
  time = this.dbService.time;

  elapsedSeconds = signal(0);
  liveGameTime = computed(() => this.formatTime(this.elapsedSeconds()));
  
  scoreLeft = signal<number>(0);
  scoreRight = signal<number>(0);
  
  prevScoreLeft = signal<number>(this.game().scoreLeft);
  prevScoreRight = signal<number>(this.game().scoreRight);

  leftAnimating = signal(false);
  rightAnimating = signal(false);

  private intervalId: any = null;
  currentItem: any;

  event: any = signal({})

  constructor() {
    effect(() => {
      const time = this.time();
      this.elapsedSeconds.set(this.parseTimeToSeconds(time));
    }, {allowSignalWrites: true});

    effect(() => {
      const newScore = this.game().scoreLeft;
      if (newScore !== this.scoreLeft()) {
        this.prevScoreLeft.set(this.scoreLeft());
        this.scoreLeft.set(newScore);
        this.leftAnimating.set(true);
        setTimeout(() => this.leftAnimating.set(false), 500);
      }
    }, {allowSignalWrites: true});

    effect(() => {
      const newScore = this.game().scoreRight;
      if (newScore !== this.scoreRight()) {
        this.prevScoreRight.set(this.scoreRight());
        this.scoreRight.set(newScore);
        this.rightAnimating.set(true);
        setTimeout(() => this.rightAnimating.set(false), 500);
      }
    }, {allowSignalWrites: true});

    effect(() => {
      const { timeRunning } = this.game();

      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }

      if (timeRunning) {
        this.intervalId = setInterval(() => {
          if (this.elapsedSeconds() == 2699 || (this.elapsedSeconds() == 5399)) {
            clearInterval(this.intervalId);
          }
          this.elapsedSeconds.set(this.elapsedSeconds() + 1);
        }, 1000);
      }
    }, {allowSignalWrites: true});

    this.bufferService.processed$.subscribe((item) => {
      this.event.set(item);
      if (!item) return;
      item.time = this.liveGameTime()
      if (item.type == 'goal') {
        this.dbService.setGoalPublished(item);
      }
      else if (item.type == 'card') {
        this.dbService.setCardPublished(item);
      }
      else if (item.type == 'substitution') {
        this.dbService.setSubstitutionPublished(item);
      }
    });
  }

  parseTimeToSeconds(timeStr: string): number {
    const parts = timeStr.split(':').map(Number);
    if (parts.length !== 2) throw new Error('Expected "mm:ss" format');
    const [mm, ss] = parts;
    return mm * 60 + ss;
  }

  formatTime(seconds: number): string {
    const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }
}
