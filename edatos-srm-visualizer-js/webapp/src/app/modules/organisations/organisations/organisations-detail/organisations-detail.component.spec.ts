import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsDetailComponent } from './organisations-detail.component';

describe('OrganisationsDetailComponent', () => {
  let component: OrganisationsDetailComponent;
  let fixture: ComponentFixture<OrganisationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
