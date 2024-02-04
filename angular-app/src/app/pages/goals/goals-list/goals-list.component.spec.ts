import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsListComponent } from './goals-list.component';

describe('GoalsListComponent', () => {
  let component: GoalsListComponent;
  let fixture: ComponentFixture<GoalsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalsListComponent]
    });
    fixture = TestBed.createComponent(GoalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
