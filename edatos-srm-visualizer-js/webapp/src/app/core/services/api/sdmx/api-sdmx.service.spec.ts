import { TestBed } from '@angular/core/testing';

import { ApiSdmxService } from './api-sdmx.service';

describe('ApiSdmxService', () => {
  let service: ApiSdmxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSdmxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
