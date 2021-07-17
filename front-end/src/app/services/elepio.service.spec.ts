import { TestBed } from '@angular/core/testing';

import { ElepioService } from './elepio.service';

describe('ElepioService', () => {
  let service: ElepioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElepioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
