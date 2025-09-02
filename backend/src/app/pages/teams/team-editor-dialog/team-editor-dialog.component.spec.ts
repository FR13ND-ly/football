import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditorDialogComponent } from './team-editor-dialog.component';

describe('TeamEditorDialogComponent', () => {
  let component: TeamEditorDialogComponent;
  let fixture: ComponentFixture<TeamEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
