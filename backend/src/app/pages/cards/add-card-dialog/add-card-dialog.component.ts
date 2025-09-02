import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamsService } from '../../../core/services/teams.service';

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
  teamsService = inject(TeamsService)


  form = this.fb.group({
    playerName: [''],
    playerNumber: ['', Validators.required],
    cardType: ['yellow', Validators.required],
    photo: ['']
  });

  onChangeValue(playerNumber: any) {
    const player: any = Object.values(this.teamsService.teams().find((t: any) => t.name == this.team)?.players).find((p: any) => p.matchNumber == playerNumber);
    this.form.patchValue({ photo: '' })
    if (player) {
      this.form.patchValue({
        playerName: player.name,
        photo: player.photo || ''
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
