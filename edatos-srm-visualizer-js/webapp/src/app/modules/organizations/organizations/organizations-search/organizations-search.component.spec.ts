import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsSearchComponent } from './organizations-search.component';

describe('OrganizationsSearchComponent', () => {
  let component: OrganizationsSearchComponent;
  let fixture: ComponentFixture<OrganizationsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
