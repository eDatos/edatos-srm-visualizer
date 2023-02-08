import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistDetailComponent } from './codelist-detail.component';

describe('CodelistDetailComponent', () => {
  let component: CodelistDetailComponent;
  let fixture: ComponentFixture<CodelistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodelistDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
