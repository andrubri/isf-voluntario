import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, public router: Router) {

    }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const result = await this.auth.isLogin();
        console.log("Login: ", result);
        if (!result){
            this.auth.logout();
        }
        return result;
    }
}
