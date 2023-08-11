import { TestBed } from '@angular/core/testing';

import { DsdApiSdmxService } from './dsd-api-sdmx.service';

describe('ConceptsSchemeApiSdmxService', () => {
  let service: DsdApiSdmxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsdApiSdmxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
