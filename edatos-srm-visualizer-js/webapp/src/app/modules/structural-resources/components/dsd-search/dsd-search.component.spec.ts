import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsdSearchComponent } from './dsd-search.component';

describe('DsdSearchComponent', () => {
  let component: DsdSearchComponent;
  let fixture: ComponentFixture<DsdSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsdSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
