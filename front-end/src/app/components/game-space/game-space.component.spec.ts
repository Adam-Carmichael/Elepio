import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSpaceComponent } from './game-space.component';

describe('GameSpaceComponent', () => {
  let component: GameSpaceComponent;
  let fixture: ComponentFixture<GameSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
