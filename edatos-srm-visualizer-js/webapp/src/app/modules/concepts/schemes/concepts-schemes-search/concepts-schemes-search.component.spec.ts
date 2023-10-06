import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptsSchemesSearchComponent } from './concepts-schemes-search.component';

describe('ConceptsSchemesSearchComponent', () => {
  let component: ConceptsSchemesSearchComponent;
  let fixture: ComponentFixture<ConceptsSchemesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptsSchemesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptsSchemesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
