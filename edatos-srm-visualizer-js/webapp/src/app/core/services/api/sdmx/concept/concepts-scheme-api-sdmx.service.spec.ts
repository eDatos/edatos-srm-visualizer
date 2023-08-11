import { TestBed } from '@angular/core/testing';

import { ConceptsSchemeApiSdmxService } from './concepts-scheme-api-sdmx.service';

describe('ConceptsSchemeApiSdmxService', () => {
  let service: ConceptsSchemeApiSdmxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptsSchemeApiSdmxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
