import { Component } from '@angular/core';
import {
    Event,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
} from '@angular/router';
import { User } from 'firebase';
import { AuthService } from './user/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public showMenu: boolean = false;

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

        this.authService.user.subscribe((user: User | null) => {
            this.showMenu = !!user;
        });
    }

    public logout(): void {
        this.authService.logout().then(() => {
            this.router.navigate(['/login']);
        });
    }
}
