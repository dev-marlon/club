import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private authService: AuthService) {}

    public title: string = 'club';

    public isUserLoggedIn(): boolean {
        return this.authService.isUserLoggedIn;
    }

    public logout(): void {
        this.authService.logout();
    }
}
