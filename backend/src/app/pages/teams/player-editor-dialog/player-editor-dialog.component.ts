import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-player-editor-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './player-editor-dialog.component.html',
  styleUrl: './player-editor-dialog.component.scss'
})
export class PlayerEditorDialogComponent implements OnInit {
  dialog = inject(MatDialogRef)
  data = inject(DIALOG_DATA)
  fb = new FormBuilder();

  playerForm = this.fb.group({
    name: [''],
    matchNumber: [''],
    photo: ['']
  });

  ngOnInit() {
    if (this.data.player) {
      this.playerForm.patchValue(this.data.player);
    }
  }

  onSubmit() {
    if (this.playerForm.valid) {
      this.dialog.close(this.playerForm.value);
    }
  }

  base64Image: string | null = null;

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const compressedBase64 = await this.compressImage(file, 300, 400, 0.3); 
    this.playerForm.patchValue({ photo: compressedBase64 });
  }

  compressImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const elem = document.createElement('canvas');
          const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
          const width = img.width * scale;
          const height = img.height * scale;
          elem.width = width;
          elem.height = height;

          const ctx = elem.getContext('2d');
          if (!ctx) {
            reject('Could not get canvas context');
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = elem.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };

        img.onerror = error => reject(error);
      };
    });
  }
}
