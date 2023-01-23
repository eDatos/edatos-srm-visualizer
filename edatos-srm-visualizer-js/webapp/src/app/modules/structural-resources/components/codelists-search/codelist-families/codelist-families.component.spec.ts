import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistFamiliesComponent } from './codelist-families.component';

describe('CodelistFamiliesComponent', () => {
  let component: CodelistFamiliesComponent;
  let fixture: ComponentFixture<CodelistFamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodelistFamiliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelistFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
