import { TestBed } from '@angular/core/testing';

import { OrganisationsSchemeApiService } from './organisations-scheme-api.service';

describe('OrganisationsSchemeApiService', () => {
  let service: OrganisationsSchemeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisationsSchemeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
