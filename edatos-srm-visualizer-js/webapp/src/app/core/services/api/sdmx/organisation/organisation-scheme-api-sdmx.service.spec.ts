import { TestBed } from '@angular/core/testing';

import { OrganisationSchemeApiSdmxService } from '././organisation-scheme-api-sdmx.service';

describe('ConceptsSchemeApiSdmxService', () => {
  let service: OrganisationSchemeApiSdmxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisationSchemeApiSdmxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
