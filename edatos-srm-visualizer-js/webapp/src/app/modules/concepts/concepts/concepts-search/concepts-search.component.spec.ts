import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptsSearchComponent } from './concepts-search.component';

describe('ConceptsSearchComponent', () => {
  let component: ConceptsSearchComponent;
  let fixture: ComponentFixture<ConceptsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
