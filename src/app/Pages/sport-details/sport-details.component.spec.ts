import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportDetailsComponent } from './sport-details.component';

describe('SportDetailsComponent', () => {
  let component: SportDetailsComponent;
  let fixture: ComponentFixture<SportDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportDetailsComponent]
    });
    fixture = TestBed.createComponent(SportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
