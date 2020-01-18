import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMemberlistComponent } from './members.component';

describe('MembersComponent', () => {
    let component: PageMemberlistComponent;
    let fixture: ComponentFixture<PageMemberlistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageMemberlistComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageMemberlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
