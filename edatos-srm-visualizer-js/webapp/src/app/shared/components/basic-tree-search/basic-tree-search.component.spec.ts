import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTreeSearchComponent } from './basic-tree-search.component';

describe('BasicSearchComponent', () => {
    let component: BasicTreeSearchComponent;
    let fixture: ComponentFixture<BasicTreeSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BasicTreeSearchComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BasicTreeSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
