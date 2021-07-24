import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElepioAppComponent } from './add-elepio-app.component';

describe('AddElepioAppComponent', () => {
  let component: AddElepioAppComponent;
  let fixture: ComponentFixture<AddElepioAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddElepioAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElepioAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
