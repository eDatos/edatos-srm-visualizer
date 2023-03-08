import { TestBed } from '@angular/core/testing';

import { CodelistsApiService } from './codelists-api.service';

describe('CodelistsApiService', () => {
  let service: CodelistsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodelistsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
