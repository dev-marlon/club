import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public user$: Observable<User | null>;

    private _redirectUrl: string = null;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.user$ = this.angularFireAuth.authState;
    }

    public set redirectUrl(url: string) {
        this._redirectUrl = url;
    }

    public get redirectUrl(): string {
        return this._redirectUrl;
    }

    public login(email: string, password: string): Promise<UserCredential> {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(
            email,
            password
        );
    }

    public logout(): Promise<void> {
        return this.angularFireAuth.auth.signOut();
    }
}
