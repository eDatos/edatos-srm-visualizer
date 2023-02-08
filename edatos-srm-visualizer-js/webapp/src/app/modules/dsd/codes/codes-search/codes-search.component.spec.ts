import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesSearchComponent } from './codes-search.component';

describe('CodesSearchComponent', () => {
  let component: CodesSearchComponent;
  let fixture: ComponentFixture<CodesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
