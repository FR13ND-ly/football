import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { teams } from '../../../core/data/teams';

@Component({
  selector: 'app-add-goal-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-goal-dialog.component.html',
  styleUrl: './add-goal-dialog.component.scss'
})
export class AddGoalDialogComponent {
  team = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  fb = new FormBuilder();

  form = this.fb.group({
    playerName: [''],
    playerNumber: ['', Validators.required],
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
