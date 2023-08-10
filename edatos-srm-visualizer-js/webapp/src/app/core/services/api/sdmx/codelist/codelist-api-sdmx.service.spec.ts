import { TestBed } from '@angular/core/testing';

import { CodelistApiSdmxService } from './codelist-api-sdmx.service';

describe('CodelistApiSdmxService', () => {
  let service: CodelistApiSdmxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodelistApiSdmxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
