import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConceptsNavbarComponent } from './concepts-navbar.component';


describe('ConceptsNavbarComponent', () => {
  let component: ConceptsNavbarComponent;
  let fixture: ComponentFixture<ConceptsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
