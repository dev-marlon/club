import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { Observable, Subject } from 'rxjs';
import { LoginData } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { takeUntil } from 'rxjs/operators';

export interface PageAuthenticateConfig {
    defaultRedirectToOnSuccess: string;
}

@Component({
    selector: 'page-authenticate',
    templateUrl: './page-authenticate.component.html',
    styleUrls: ['./page-authenticate.component.scss'],
})
export class PageAuthenticateComponent implements OnDestroy {
    public loginFormDisabled = false;
    public user$: Observable<User | null>;

    private config: PageAuthenticateConfig = null;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.activatedRoute.data
            .pipe(takeUntil(this.destroy$))
            .subscribe((config: PageAuthenticateConfig) => {
                this.config = config;
            });
        this.user$ = this.authService.user$;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onLogin(loginData: LoginData): void {
        this.authService
            .login(loginData.email, loginData.password)
            .then(() => {
                if (this.authService.redirectUrl) {
                    this.redirectTo(this.authService.redirectUrl);
                }

                if (this.config.defaultRedirectToOnSuccess) {
                    this.redirectTo(this.config.defaultRedirectToOnSuccess);
                }
            })
            .catch((error: any) => {
                const snackBarRef = this.snackBar.open(error.code, null, {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });

                this.loginFormDisabled = true;

                snackBarRef
                    .afterDismissed()
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.loginFormDisabled = false;
                    });
            });
    }

    private redirectTo(target: string): void {
        this.router.navigate([target]);
    }
}
