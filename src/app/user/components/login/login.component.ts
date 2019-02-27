import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    constructor(private authService: AuthService, private router: Router) {}

    public ngOnInit(): void {}

    public isUserLoggedIn(): boolean {
        return this.authService.isUserLoggedIn;
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
                console.log(error);
            });
    }
}
