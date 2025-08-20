import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalEventComponent } from './goal-event.component';

describe('GoalEventComponent', () => {
  let component: GoalEventComponent;
  let fixture: ComponentFixture<GoalEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
