import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElepioAppListComponent } from './elepio-app-list.component';

describe('ElepioAppListComponent', () => {
  let component: ElepioAppListComponent;
  let fixture: ComponentFixture<ElepioAppListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElepioAppListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElepioAppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
