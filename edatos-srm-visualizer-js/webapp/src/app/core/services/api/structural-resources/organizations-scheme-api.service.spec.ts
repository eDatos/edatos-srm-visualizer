import { TestBed } from '@angular/core/testing';

import { OrganizationsSchemeApiService } from './organizations-scheme-api.service';

describe('OrganizationsSchemeApiService', () => {
  let service: OrganizationsSchemeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationsSchemeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
