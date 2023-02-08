import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsDetailComponent } from './organizations-detail.component';

describe('OrganizationsDetailComponent', () => {
  let component: OrganizationsDetailComponent;
  let fixture: ComponentFixture<OrganizationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
