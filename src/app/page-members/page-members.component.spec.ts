import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMembersComponent } from './page-members.component';

describe('MembersComponent', () => {
    let component: PageMembersComponent;
    let fixture: ComponentFixture<PageMembersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageMembersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageMembersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
