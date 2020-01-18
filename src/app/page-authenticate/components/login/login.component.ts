import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface LoginData {
    email: string;
    password: string;
}

@Component({
    selector: 'page-authenticate-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @Input() public formDisabled: boolean;
    @Output() public login: EventEmitter<LoginData> = new EventEmitter();

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    public onSubmit(): void {
        this.login.emit({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
        });
    }
}
