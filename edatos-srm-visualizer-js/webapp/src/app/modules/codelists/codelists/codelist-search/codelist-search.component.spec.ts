import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistSearchComponent } from './codelist-search.component';

describe('CodelistSearchComponent', () => {
  let component: CodelistSearchComponent;
  let fixture: ComponentFixture<CodelistSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodelistSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
