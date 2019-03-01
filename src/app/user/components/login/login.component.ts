import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public disableForm: boolean = false;

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    public ngOnInit(): void {}

    public isUserLoggedIn(): boolean {
        return this.authService.isUserLoggedIn();
    }

    public onSubmit(): void {
        this.authService
            .login(this.loginForm.value.email, this.loginForm.value.password)
            .then(() => {
                if (this.authService.redirectUrl) {
                    this.router.navigate([this.authService.redirectUrl]);
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
}
