import { Component, inject, OnInit } from '@angular/core';
import { DbService } from '../../core/services/db.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ShirtComponent } from '../../core/ui/shirt/shirt.component';
import { teams } from '../../core/data/teams';

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

  teams = teams

  onTeamChange(teamName: any, side: 'left' | 'right') {
    let team = this.teams.find(t => t.name === teamName);
    if (side === 'left') {
      this.gameForm.patchValue({
        leftTeamColor: {
          hands: team?.hands,
          shirt: team?.shirt
        }
      });
    } else {
      this.gameForm.patchValue({
        rightTeamColor: {
          hands: team?.hands,
          shirt: team?.shirt
        }
      });
    }
  }
}
