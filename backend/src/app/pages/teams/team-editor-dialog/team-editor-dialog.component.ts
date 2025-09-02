import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-editor-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './team-editor-dialog.component.html',
  styleUrl: './team-editor-dialog.component.scss'
})
export class TeamEditorDialogComponent implements OnInit {
  dialog = inject(DialogRef)
  data = inject(DIALOG_DATA)
  fb = new FormBuilder();

  teamForm = this.fb.group({
    name: [''],
    shirt: ['#ffffff'],
    hands: ['#000000']
  });

  ngOnInit(): void {
    if (this.data && this.data.team) {
      this.teamForm.patchValue(this.data.team);
    }

  }

  onSubmit() {
    this.dialog.close(this.teamForm.value);
  }
}
