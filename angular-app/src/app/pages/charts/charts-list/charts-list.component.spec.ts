import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsListComponent } from './charts-list.component';

describe('ChartsListComponent', () => {
  let component: ChartsListComponent;
  let fixture: ComponentFixture<ChartsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
