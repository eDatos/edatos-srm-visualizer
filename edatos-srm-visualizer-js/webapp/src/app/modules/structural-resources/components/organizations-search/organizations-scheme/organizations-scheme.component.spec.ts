import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsSchemeComponent } from './organizations-scheme.component';

describe('OrganizationsSchemeComponent', () => {
  let component: OrganizationsSchemeComponent;
  let fixture: ComponentFixture<OrganizationsSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationsSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
