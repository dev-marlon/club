import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import {
    Event,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
} from '@angular/router';
import { User } from 'firebase';
import { AuthService } from './page-authenticate/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageRoutes } from './business-domain/page-routes.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    public showMenu = false;
    private destroy$: Subject<void> = new Subject<void>();

    @ViewChild('sidenav', { static: false }) public sidenav: MatSidenav;

    constructor(private authService: AuthService, private router: Router) {
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: Event) => {
                if (event instanceof NavigationStart) {
                    // Show loading indicator
                }

                if (event instanceof NavigationEnd) {
                    // Hide loading indicator
                }

                if (event instanceof NavigationError) {
                    // Hide loading indicator
                    // Present error to user
                    console.log(event.error);
                }
            });

        this.authService.user$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user: User | null) => {
                this.showMenu = !!user;
            });
    }

    public logout(): void {
        this.sidenav
            .close()
            .then(() => this.authService.logout())
            .then(() => {
                this.router.navigate([PageRoutes.Authenticate]);
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
