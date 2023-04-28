import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTreeDetailComponent } from './basic-tree-detail.component';

describe('BasicTreeDetailComponent', () => {
    let component: BasicTreeDetailComponent;
    let fixture: ComponentFixture<BasicTreeDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BasicTreeDetailComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BasicTreeDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
