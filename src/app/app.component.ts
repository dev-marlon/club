import { Component } from '@angular/core';
import {
    Event,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
} from '@angular/router';
import { AuthService } from './user/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private authService: AuthService, private router: Router) {
        this.router.events.subscribe((event: Event) => {
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
    }

    public isUserLoggedIn(): boolean {
        return this.authService.isUserLoggedIn();
    }

    public logout(): void {
        this.authService.logout().then(() => this.router.navigate(['']));
    }
}
