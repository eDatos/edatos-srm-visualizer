import { TestBed } from '@angular/core/testing';

import { CodelistCodesApiService } from './codelist-codes-api.service';

describe('CodelistCodesApiService', () => {
  let service: CodelistCodesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodelistCodesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
