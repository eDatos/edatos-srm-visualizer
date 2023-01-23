import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSchemeComponent } from './categories-scheme.component';

describe('CategoriesSchemeComponent', () => {
  let component: CategoriesSchemeComponent;
  let fixture: ComponentFixture<CategoriesSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
