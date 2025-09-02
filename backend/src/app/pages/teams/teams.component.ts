import { Component, inject } from '@angular/core';
import { TeamsService } from '../../core/services/teams.service';
import { Dialog } from '@angular/cdk/dialog';
import { TeamEditorDialogComponent } from './team-editor-dialog/team-editor-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  teamsService = inject(TeamsService);
  dialog = inject(MatDialog)
  teams = this.teamsService.teams;

  onAddTeam() {
    let d = this.dialog.open(TeamEditorDialogComponent, {
      data: {
        team: {
          name: '',
          shirt: '#fff',
          hands: '#000'
        }
      }
    });
    d.afterClosed().subscribe((result) => {
      if (result) {
        this.teamsService.addTeam(result);
      }
    });
  }

  onEditTeam(team: any) {
    let d = this.dialog.open(TeamEditorDialogComponent, {
      data: {
        team: { ...team }
      }
    });
    d.afterClosed().subscribe((result) => {
      if (result) {
        this.teamsService.editTeam({ ...result, key: team.key });
      }
    });
  }

  onDeleteTeam(team: any) {
    this.teamsService.deleteTeam(team.key);
  }
}
