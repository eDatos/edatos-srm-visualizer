import { TestBed } from '@angular/core/testing';

import { DsdApiService } from './dsd-api.service';

describe('DsdApiService', () => {
  let service: DsdApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsdApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
