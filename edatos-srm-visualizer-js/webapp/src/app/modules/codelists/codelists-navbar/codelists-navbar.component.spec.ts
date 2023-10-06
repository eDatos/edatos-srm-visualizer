import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistsNavbarComponent } from './codelists-navbar.component';

describe('CodelistsNavbarComponent', () => {
  let component: CodelistsNavbarComponent;
  let fixture: ComponentFixture<CodelistsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodelistsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelistsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
