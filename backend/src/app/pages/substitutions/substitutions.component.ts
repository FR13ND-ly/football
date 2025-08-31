import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubstitutionsService } from '../../core/services/substitutions.service';
import { DbService } from '../../core/services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSubstitutionDialogComponent } from './add-substitution-dialog/add-substitution-dialog.component';
import { ShirtComponent } from '../../core/ui/shirt/shirt.component';

@Component({
  selector: 'app-substitutions',
  standalone: true,
  imports: [FormsModule, ShirtComponent],
  templateUrl: './substitutions.component.html',
  styleUrl: './substitutions.component.scss'
})
export class SubstitutionsComponent {
  substitutionsService = inject(SubstitutionsService)
  dbService = inject(DbService)
  dialog = inject(MatDialog)

  substitutions = this.substitutionsService.substitutions;
  game = this.dbService.game;

  leftTeamSubstitutions = computed(() => this.substitutions().filter((substitution: any) => substitution.team === 'left'));
  rightTeamSubstitutions = computed(() => this.substitutions().filter((substitution: any) => substitution.team === 'right'));


  onAddSubstitution(team: string) {
    let teamName = team == 'left' ? this.game().leftTeamName : this.game().rightTeamName;
    const dialogRef = this.dialog.open(AddSubstitutionDialogComponent, { data: teamName });
    dialogRef.afterClosed().subscribe((result) => {
      let data = {
        playerToComeName: result?.playerToComeName,
        playerToComeNumber: result?.playerToComeNumber,
        playerToGoName: result?.playerToGoName,
        playerToGoNumber: result?.playerToGoNumber,
        team,
        teamName
      };  
      if (result) {
        this.substitutionsService.addSubstitution(data);
      }
    });
  }

  onEditSubstitution(substitution: any) {
    this.substitutionsService.editSubstitution(substitution);
  }

  onDeleteSubstitution(substitution: any) {
    this.substitutionsService.deleteSubstitution(substitution.key);
  }
}
