import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptsComponent } from '../concepts-search/concepts-search.component';

describe('ConceptsComponent', () => {
  let component: ConceptsComponent;
  let fixture: ComponentFixture<ConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
