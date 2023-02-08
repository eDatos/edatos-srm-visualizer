import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesDetailComponent } from './codes-detail.component';

describe('CodesDetailComponent', () => {
  let component: CodesDetailComponent;
  let fixture: ComponentFixture<CodesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
