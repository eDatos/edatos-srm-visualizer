import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsNavbarComponent } from './organisations-navbar.component';

describe('OrganisationsNavbarComponent', () => {
  let component: OrganisationsNavbarComponent;
  let fixture: ComponentFixture<OrganisationsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
