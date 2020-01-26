import {
    Component,
    EventEmitter,
    HostBinding,
    OnDestroy,
    Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
export class FilterComponent implements OnDestroy {
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

    private destroy$: Subject<void> = new Subject<void>();

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
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((filterData: FilterData) => {
                this.filterChange.emit(filterData);
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
