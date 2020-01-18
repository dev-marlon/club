import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { LoginData } from './components/login/login.component';
import { AuthService } from './services/auth.service';

export interface PageAuthenticateConfig {
    defaultRedirectToOnSuccess: string;
}

@Component({
    selector: 'page-authenticate',
    templateUrl: './page-authenticate.component.html',
    styleUrls: ['./page-authenticate.component.scss'],
})
export class PageAuthenticateComponent {
    public loginFormDisabled: boolean = false;
    public user: Observable<User | null>;

    private config: PageAuthenticateConfig = null;

    constructor(
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.activatedRoute.data.subscribe((config: PageAuthenticateConfig) => {
            this.config = config;
        });
        this.user = this.authService.user;
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

                snackBarRef.afterDismissed().subscribe(() => {
                    this.loginFormDisabled = false;
                });
            });
    }

    private redirectTo(target: string): void {
        this.router.navigate([target]);
    }
}
