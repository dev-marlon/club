import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';

export interface FilterData {
    searchString: string;
    categories: string[];
}

const searchStringMinLength = 2;

@Component({
    selector: 'page-members-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
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
    public selectedCategories: string[] = [];

    @HostBinding('class.categories-selected')
    public get categoriesSelected(): boolean {
        return this.form.get('categories').value.length;
    }

    @Output() public filterChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.form.valueChanges
            .pipe(
                map((filterData: FilterData) => {
                    if (
                        filterData.searchString.length < searchStringMinLength
                    ) {
                        filterData.searchString = '';
                    }

                    return filterData;
                }),
                tap((filterData: FilterData) => {
                    this.selectedCategories = filterData.categories;
                })
            )
            .subscribe((filterData: FilterData) => {
                this.filterChange.emit(filterData);
            });
    }

    public removeFilterChip(category: string): void {
        this.form
            .get('categories')
            .setValue(
                this.selectedCategories.filter(
                    (_category: string) => _category !== category
                )
            );
    }
}
