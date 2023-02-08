import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSearchComponent } from './categories-search.component';

describe('CategoriesSearchComponent', () => {
  let component: CategoriesSearchComponent;
  let fixture: ComponentFixture<CategoriesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
