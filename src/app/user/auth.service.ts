import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

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
            } else {
                this.user = null;
            }
        });
    }

    public set redirectUrl(url: string) {
        this._redirectUrl = url;
    }

    public get redirectUrl(): string {
        return this._redirectUrl;
    }

    public get isUserLoggedIn(): boolean {
        return this.angularFireAuth.auth.currentUser !== null;
    }

    public async login(email: string, password: string): Promise<any> {
        return await this.angularFireAuth.auth.signInWithEmailAndPassword(
            email,
            password
        );
    }

    public async logout(): Promise<any> {
        await this.angularFireAuth.auth.signOut();
    }
}
