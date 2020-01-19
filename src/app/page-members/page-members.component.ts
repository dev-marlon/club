import { Component } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FilterData } from './components/filter/filter.component';
import { Member } from './models/member.interface';
import { MembersService } from './services/members.service';

@Component({
    selector: 'page-members',
    templateUrl: './page-members.component.html',
    styleUrls: ['./page-members.component.scss'],
})
export class PageMembersComponent {
    public members$: Observable<Member[]>;
    public filteredMembers$: Observable<Member[]>;

    private filterChanged$: Subject<FilterData> = new Subject<FilterData>();

    constructor(private membersService: MembersService) {
        this.members$ = this.membersService.members$.pipe(
            map((members: Member[]) =>
                members.sort((a: Member, b: Member) =>
                    a.lastname < b.lastname ? -1 : 1
                )
            )
        );

        this.filteredMembers$ = combineLatest([
            this.members$,
            this.filterChanged$.pipe(startWith(<string>null)),
        ]).pipe(
            map(([members, filterData]: [Member[], FilterData]) => {
                if (filterData === null) {
                    return members;
                }

                let filteredMembers = members;

                if (filterData.searchString.length) {
                    const _searchString = filterData.searchString.toLowerCase();

                    filteredMembers = filteredMembers.filter(
                        (member: Member) => {
                            return (
                                member.firstname
                                    .toLowerCase()
                                    .indexOf(_searchString) !== -1 ||
                                member.lastname
                                    .toLowerCase()
                                    .indexOf(_searchString) !== -1
                            );
                        }
                    );
                }

                if (filterData.categories.length > 0) {
                    filteredMembers = filteredMembers.filter(
                        (member: Member) => {
                            return (
                                filterData.categories.indexOf(
                                    member.category
                                ) !== -1
                            );
                        }
                    );
                }

                return filteredMembers;
            })
        );
    }

    public onFilterChange(filterData: FilterData): void {
        this.filterChanged$.next(filterData);
    }

    private applyFilter(): any[] {
        return [];
    }
}
