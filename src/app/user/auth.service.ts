import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

const userLocalStorageKey = 'rc-allemannia.user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public user: User = null;
    private _redirectUrl: string = null;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.angularFireAuth.authState.subscribe((user: User) => {
            if (user) {
                this.user = user;
                localStorage.setItem(userLocalStorageKey, JSON.stringify(user));
            } else {
                this.user = null;
                localStorage.removeItem(userLocalStorageKey);
            }
        });
    }

    public set redirectUrl(url: string) {
        this._redirectUrl = url;
    }

    public get redirectUrl(): string {
        return this._redirectUrl;
    }

    public isUserLoggedIn(): boolean {
        return localStorage.getItem(userLocalStorageKey) !== null;
    }

    public async login(email: string, password: string): Promise<any> {
        return await this.angularFireAuth.auth.signInWithEmailAndPassword(
            email,
            password
        );
    }

    public async logout(): Promise<any> {
        localStorage.removeItem('user');
        this.user = null;
        await this.angularFireAuth.auth.signOut();
    }
}
