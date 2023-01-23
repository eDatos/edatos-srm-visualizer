import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdComponent } from './dsd.component';

describe('DsdComponent', () => {
  let component: DsdComponent;
  let fixture: ComponentFixture<DsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
