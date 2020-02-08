import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

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

    private filterChanged$: BehaviorSubject<FilterData> = new BehaviorSubject<
        FilterData
    >({ searchString: '', categories: [] });

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
            this.filterChanged$,
        ]).pipe(
            map(([members, filterData]: [Member[], FilterData]) => {
                if (filterData.searchString === '') {
                    return [members, filterData];
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

                return [filteredMembers, filterData];
            }),
            map(([members, filterData]: [Member[], FilterData]) => {
                if (filterData.categories.length === 0) {
                    return members;
                }

                let filteredMembers = members;

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
}
