import { Component, inject, signal } from '@angular/core';
import { TeamsService } from '../../core/services/teams.service';
import { TeamEditorDialogComponent } from './team-editor-dialog/team-editor-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerEditorDialogComponent } from './player-editor-dialog/player-editor-dialog.component';
import { ShirtComponent } from '../../core/ui/shirt/shirt.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [ShirtComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  teamsService = inject(TeamsService);
  dialog = inject(MatDialog)
  teams = this.teamsService.teams;

  selectedIndex = signal(-1)
  players = this.teamsService.players;

  onAddTeam() {
    let d = this.dialog.open(TeamEditorDialogComponent, {
      data: {
        team: {
          name: '',
          shirt: '#ffffff',
          hands: '#000000'
        }
      }
    });
    d.afterClosed().subscribe((result) => {
      if (result) {
        this.teamsService.addTeam(result);
      }
    });
  }

  onEditTeam() {
    let team = this.teams()[this.selectedIndex()];
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

  onDeleteTeam() {
    let teamKey = this.teams()[this.selectedIndex()].key;
    this.teamsService.deleteTeam(teamKey);
    this.selectedIndex.set(-1);
  }

  onSelectTeam(index: number) {
    let key = this.teams()[index].key;
    this.selectedIndex.set(index);
    this.teamsService.getPlayers(key);
  }

  onAddPlayer() {
    let d = this.dialog.open(PlayerEditorDialogComponent, {
      data: {
        player: {
          name: '',
          position: ''
        }
      }
    });
    d.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        let teamKey = this.teams()[this.selectedIndex()].key;
        this.teamsService.addPlayer(teamKey, result);
        this.teamsService.getPlayers(teamKey);
      }
    });
  }

  onEditPlayer(player: any) {
    let d = this.dialog.open(PlayerEditorDialogComponent, {
      data: {
        player: { ...player }
      }
    });
    d.afterClosed().subscribe((result) => {
      if (result) {
        let teamKey = this.teams()[this.selectedIndex()].key;
        this.teamsService.editPlayer(teamKey, { ...result, key: player.key });
        this.teamsService.getPlayers(teamKey);
      }
    });
  }

  onDeletePlayer(player: any) {
    let teamKey = this.teams()[this.selectedIndex()].key;
    this.teamsService.deletePlayer(teamKey, player.key);
    this.teamsService.getPlayers(teamKey);
  }
}
