import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { PageRoutes } from '../../business-domain/page-routes.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.user.pipe(
            take(1),
            map((user: User | null) => !!user),
            tap((loggedIn: boolean) => {
                if (loggedIn) {
                    return;
                }

                this.authService.redirectUrl = state.url;
                this.router.navigate([PageRoutes.Authenticate]);
            })
        );
    }
}
