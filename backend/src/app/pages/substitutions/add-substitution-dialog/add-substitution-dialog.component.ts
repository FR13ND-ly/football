import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamsService } from '../../../core/services/teams.service';

@Component({
  selector: 'app-add-substitution-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-substitution-dialog.component.html',
  styleUrl: './add-substitution-dialog.component.scss'
})
export class AddSubstitutionDialogComponent {
  team = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  fb = new FormBuilder();
  teamsService = inject(TeamsService)

  form = this.fb.group({
    playerToComeNumber: ['', Validators.required],
    playerToComeName: [''],
    playerToComePhoto: [''],
    playerToGoNumber: ['', Validators.required],
    playerToGoName: [''],
    playerToGoPhoto: ['']
  });


  onChangeValue(playerNumber: any, type: 'come' | 'go') {
    const player: any = Object.values(this.teamsService.teams().find((t: any) => t.name == this.team)?.players).find((p: any) => p.matchNumber == playerNumber);
    if (player) {
      if (type === 'come') {
        this.form.patchValue({ playerToComePhoto: '' })
        this.form.patchValue({
          playerToComeName: player.name,
          playerToComePhoto: player.photo || ''
        });
      } else {
        this.form.patchValue({ playerToGoPhoto: '' })
        this.form.patchValue({
          playerToGoName: player.name,
          playerToGoPhoto: player.photo || ''
        });
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
