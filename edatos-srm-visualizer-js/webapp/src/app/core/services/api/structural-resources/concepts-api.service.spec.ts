import { TestBed } from '@angular/core/testing';

import { ConceptsApiService } from './concepts-api.service';

describe('ConceptsApiService', () => {
  let service: ConceptsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
