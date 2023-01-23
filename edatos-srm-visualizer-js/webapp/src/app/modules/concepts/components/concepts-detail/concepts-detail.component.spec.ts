import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptsDetailComponent } from './concepts-detail.component';

describe('ConceptsDetailComponent', () => {
  let component: ConceptsDetailComponent;
  let fixture: ComponentFixture<ConceptsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
