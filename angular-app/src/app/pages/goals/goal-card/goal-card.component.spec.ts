import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCardComponent } from './goal-card.component';

describe('GoalCardComponent', () => {
  let component: GoalCardComponent;
  let fixture: ComponentFixture<GoalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalCardComponent]
    });
    fixture = TestBed.createComponent(GoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
