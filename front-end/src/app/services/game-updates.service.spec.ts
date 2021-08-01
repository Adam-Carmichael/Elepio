import { TestBed } from '@angular/core/testing';

import { GameUpdatesService } from './game-updates.service';

describe('GameUpdatesService', () => {
  let service: GameUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
