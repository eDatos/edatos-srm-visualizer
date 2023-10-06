import { TestBed } from '@angular/core/testing';

import { ConceptsSchemeApiService } from './concepts-scheme-api.service';

describe('ConceptsSchemeApiService', () => {
  let service: ConceptsSchemeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptsSchemeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
