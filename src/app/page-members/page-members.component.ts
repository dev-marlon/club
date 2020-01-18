import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { debounce, delay, map, startWith } from 'rxjs/operators';

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

    public form: FormGroup = new FormGroup({
        searchString: new FormControl('', [Validators.minLength(2)]),
        categories: new FormControl(''),
    });
    public categories: string[] = [
        'Beirat',
        'Ehrenmitglied',
        'Trainer',
        'Vorstand',
    ];

    private searchInput$: Observable<string>;
    public categoriesSelect$: Observable<string[]>;

    constructor(private membersService: MembersService) {
        this.members$ = this.membersService.members$.pipe(
            map((members: Member[]) =>
                members.sort((a: Member, b: Member) =>
                    a.lastname < b.lastname ? -1 : 1
                )
            )
        );

        const searchStringMinLength = 2;
        const debounceSearch = 0;

        this.searchInput$ = this.form.get('searchString').valueChanges.pipe(
            startWith(''),
            map((searchString: string) =>
                searchString.length >= searchStringMinLength ? searchString : ''
            ),
            debounce((val: any) => {
                return of(true).pipe(
                    delay(
                        val.length >= searchStringMinLength ? debounceSearch : 0
                    )
                );
            })
        );

        this.categoriesSelect$ = this.form
            .get('categories')
            .valueChanges.pipe(startWith([]));

        this.filteredMembers$ = combineLatest([
            this.members$,
            this.searchInput$,
            this.categoriesSelect$,
        ]).pipe(
            map(
                ([members, searchString, selectedCategories]: [
                    Member[],
                    string,
                    string[]
                ]) => {
                    let filteredMembers = members;

                    if (searchString.length >= searchStringMinLength) {
                        const _searchString = searchString.toLowerCase();

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

                    if (selectedCategories.length > 0) {
                        filteredMembers = filteredMembers.filter(
                            (member: Member) => {
                                return (
                                    selectedCategories.indexOf(
                                        member.category
                                    ) !== -1
                                );
                            }
                        );
                    }

                    return filteredMembers;
                }
            )
        );
    }

    public removeFilterChip(category: string): void {
        const selectedCategories: string[] = this.form.get('categories').value;
        this.form
            .get('categories')
            .setValue(
                selectedCategories.filter(
                    (_category: string) => _category !== category
                )
            );
    }
}
