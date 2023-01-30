import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemesDetailComponent } from './schemes-detail.component';

describe('SchemesDetailComponent', () => {
  let component: SchemesDetailComponent;
  let fixture: ComponentFixture<SchemesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
