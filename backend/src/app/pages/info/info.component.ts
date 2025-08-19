import { Component, inject, OnInit } from '@angular/core';
import { DbService } from '../../core/services/db.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ShirtComponent } from '../../core/ui/shirt/shirt.component';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ShirtComponent, ReactiveFormsModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
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
