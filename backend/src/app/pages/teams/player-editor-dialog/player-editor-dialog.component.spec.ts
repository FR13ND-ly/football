import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEditorDialogComponent } from './player-editor-dialog.component';

describe('PlayerEditorDialogComponent', () => {
  let component: PlayerEditorDialogComponent;
  let fixture: ComponentFixture<PlayerEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
