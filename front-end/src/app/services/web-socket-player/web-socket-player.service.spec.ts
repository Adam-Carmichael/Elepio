import { TestBed } from '@angular/core/testing';

import { WebSocketPlayerService } from './web-socket-player.service';

describe('WebSocketPlayerService', () => {
  let service: WebSocketPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
