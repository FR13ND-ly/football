import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubstitutionDialogComponent } from './add-substitution-dialog.component';

describe('AddSubstitutionDialogComponent', () => {
  let component: AddSubstitutionDialogComponent;
  let fixture: ComponentFixture<AddSubstitutionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubstitutionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubstitutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
