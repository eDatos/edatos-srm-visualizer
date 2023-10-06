import { TestBed } from '@angular/core/testing';

import { CategoriesSchemeApiService } from './categories-scheme-api.service';

describe('CategoriesSchemeApiService', () => {
  let service: CategoriesSchemeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesSchemeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
