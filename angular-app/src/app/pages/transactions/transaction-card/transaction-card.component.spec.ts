import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCardComponent } from './transaction-card.component';

describe('TransactionCardComponent', () => {
  let component: TransactionCardComponent;
  let fixture: ComponentFixture<TransactionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionCardComponent]
    });
    fixture = TestBed.createComponent(TransactionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
