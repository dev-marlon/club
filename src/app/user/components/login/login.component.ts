import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { AuthService } from '../../auth.service';

export interface LoginConfig {
    defaultRedirectToOnSuccess: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public disableForm: boolean = false;
    public isUserLoggedIn: boolean = false;
    private config: LoginConfig = null;

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.data.subscribe((config: LoginConfig) => {
            this.config = config;
        });

        this.authService.user.subscribe((user: User | null) => {
            this.isUserLoggedIn = !!user;
        });
    }

    public onSubmit(): void {
        this.authService
            .login(this.loginForm.value.email, this.loginForm.value.password)
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

                this.disableForm = true;

                snackBarRef.afterDismissed().subscribe(() => {
                    this.disableForm = false;
                });
            });
    }

    private redirectTo(target: string): void {
        this.router.navigate([target]);
    }
}
