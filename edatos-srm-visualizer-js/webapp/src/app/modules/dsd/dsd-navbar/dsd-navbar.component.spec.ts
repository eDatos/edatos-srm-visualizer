import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdNavbarComponent } from './dsd-navbar.component';

describe('DsdNavbarComponent', () => {
  let component: DsdNavbarComponent;
  let fixture: ComponentFixture<DsdNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsdNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsdNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
