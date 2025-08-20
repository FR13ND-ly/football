import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionEventComponent } from './substitution-event.component';

describe('SubstitutionEventComponent', () => {
  let component: SubstitutionEventComponent;
  let fixture: ComponentFixture<SubstitutionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubstitutionEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstitutionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
