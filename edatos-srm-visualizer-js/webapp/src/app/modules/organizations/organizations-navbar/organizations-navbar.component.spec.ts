import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsNavbarComponent } from './organizations-navbar.component';

describe('OrganizationsNavbarComponent', () => {
  let component: OrganizationsNavbarComponent;
  let fixture: ComponentFixture<OrganizationsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
