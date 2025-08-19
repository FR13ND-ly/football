import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
