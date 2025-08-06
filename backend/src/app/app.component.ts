import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DbService } from './db.service';
import { ShirtComponent } from './shirt/shirt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShirtComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  dbService = inject(DbService)

  gameForm = this.dbService.gameForm;

  ngOnInit(): void {
    console.log(this.dbService.game());
  }

  onUpdateGame() {
    const gameData = this.gameForm.value;
    this.dbService.updateGame(gameData);
  }
}
