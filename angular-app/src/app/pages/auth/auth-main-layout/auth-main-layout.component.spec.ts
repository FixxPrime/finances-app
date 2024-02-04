import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMainLayoutComponent } from './auth-main-layout.component';

describe('AuthMainLayoutComponent', () => {
  let component: AuthMainLayoutComponent;
  let fixture: ComponentFixture<AuthMainLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthMainLayoutComponent]
    });
    fixture = TestBed.createComponent(AuthMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
