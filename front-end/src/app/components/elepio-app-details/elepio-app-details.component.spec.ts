import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElepioAppDetailsComponent } from './elepio-app-details.component';

describe('ElepioAppDetailsComponent', () => {
  let component: ElepioAppDetailsComponent;
  let fixture: ComponentFixture<ElepioAppDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElepioAppDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElepioAppDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
