import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { teams } from '../../../core/data/teams';

@Component({
  selector: 'app-add-card-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-card-dialog.component.html',
  styleUrl: './add-card-dialog.component.scss'
})
export class AddCardDialogComponent {
  team = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  fb = new FormBuilder();

  form = this.fb.group({
    playerName: [''],
    playerNumber: ['', Validators.required],
    cardType: ['yellow', Validators.required],
  });

  players = teams.find(t => t.name === this.team)?.players || [];
  
  onChangeValue(playerNumber: any) {
    const player = this.players.find(p => p.matchNumber == playerNumber);
    if (player) {
      this.form.patchValue({
        playerName: player.name
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
