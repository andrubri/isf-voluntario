import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

import {Observable, from} from 'rxjs';
import {ISFService} from './isf.service';

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {

    }

    public login(email: string, clave: string): any {
        return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(async () => {
            return await this.afAuth.auth.signInWithEmailAndPassword(email, clave);
        });
    }

    public isLogin(): Promise<boolean> {
        const isLogin = new Promise<boolean>((resolve, reject) => {
            this.afAuth.authState.subscribe(res => {
                if (res && res.uid) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });

        return isLogin;
    }

    public GetTokenFirebase(): Observable<string> {
        let token: Observable<string> = null;

        if (this.afAuth.auth.currentUser) {
            token = from(this.afAuth.auth.currentUser.getIdToken());
            return token;
        } else {
            return new Observable((observer) => {
                return observer.next('');
            });
        }

    }

    public async logout(): Promise<void> {
        await this.afAuth.auth.signOut();
        this.router.navigate(['/login']);

    }
}
