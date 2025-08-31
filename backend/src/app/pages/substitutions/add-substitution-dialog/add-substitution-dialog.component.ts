import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { teams } from '../../../core/data/teams';

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

  form = this.fb.group({
    playerToComeNumber: ['', Validators.required],
    playerToComeName: [''],
    playerToGoNumber: ['', Validators.required],
    playerToGoName: [''],
  });

  players = teams.find(t => t.name === this.team)?.players || [];

  onChangeValue(playerNumber: any, type: 'come' | 'go') {
    const player = this.players.find(p => p.matchNumber == playerNumber);
    if (player) {
      if (type === 'come') {
        this.form.patchValue({
          playerToComeName: player.name
        });
      } else {
        this.form.patchValue({
          playerToGoName: player.name
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
