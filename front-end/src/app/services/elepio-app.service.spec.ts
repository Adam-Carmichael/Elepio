import { TestBed } from '@angular/core/testing';

import { ElepioAppService } from './elepio-app.service';

describe('ElepioAppService', () => {
  let service: ElepioAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElepioAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
