import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistsSearchComponent } from './codelists-search.component';

describe('CodelistsSearchComponent', () => {
  let component: CodelistsSearchComponent;
  let fixture: ComponentFixture<CodelistsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodelistsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelistsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
