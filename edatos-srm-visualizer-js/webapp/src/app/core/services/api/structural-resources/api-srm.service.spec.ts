import { TestBed } from '@angular/core/testing';

import { ApiSrmService } from './api-srm.service';

describe('ApiSrmService', () => {
  let service: ApiSrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
