import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import UserCredential = firebase.auth.UserCredential;

describe('AuthService', () => {
    let authService: AuthService;
    let angularFireAuthSpy: jasmine.SpyObj<AngularFireAuth>;

    beforeEach(() => {
        const afaSpy = jasmine.createSpyObj('AngularFireAuth', ['auth']);

        afaSpy.auth = jasmine.createSpyObj('User', [
            'signInWithEmailAndPassword',
            'signOut',
        ]);

        afaSpy.auth.signInWithEmailAndPassword.and.callFake(() => {
            return new Promise<UserCredential>((resolve: any) => resolve());
        });

        afaSpy.auth.signOut.and.callFake(() => {
            return new Promise<void>((resolve: any) => resolve());
        });

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AngularFireAuth,
                    useValue: afaSpy,
                },
                AuthService,
            ],
        });

        authService = TestBed.get(AuthService);
        angularFireAuthSpy = TestBed.get(AngularFireAuth);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    it('should have the correct redirectTo value', () => {
        const redirectToValue = 'foo/bar';
        authService.redirectUrl = redirectToValue;
        expect(authService.redirectUrl).toBe(redirectToValue);
    });

    it('should call signInWithEmailAndPassword on login', () => {
        authService.login('email@example.org', 'secret');
        expect(
            angularFireAuthSpy.auth.signInWithEmailAndPassword
        ).toHaveBeenCalled();
    });

    it('should call signOut on logout', () => {
        authService.logout();
        expect(angularFireAuthSpy.auth.signOut).toHaveBeenCalled();
    });
});
