import { TestBed } from '@angular/core/testing';

import { CodelistFamiliesApiService } from './codelist-families-api.service';

describe('CodelistFamiliesApiService', () => {
  let service: CodelistFamiliesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodelistFamiliesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
