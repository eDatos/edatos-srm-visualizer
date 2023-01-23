import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptsSchemesDetailComponent } from './concepts-schemes-detail.component';

describe('ConceptsSchemesDetailComponent', () => {
  let component: ConceptsSchemesDetailComponent;
  let fixture: ComponentFixture<ConceptsSchemesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptsSchemesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptsSchemesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
