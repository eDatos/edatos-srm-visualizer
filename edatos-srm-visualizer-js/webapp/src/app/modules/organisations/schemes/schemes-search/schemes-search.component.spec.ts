import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemesSearchComponent } from './schemes-search.component';

describe('SchemesSearchComponent', () => {
  let component: SchemesSearchComponent;
  let fixture: ComponentFixture<SchemesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
