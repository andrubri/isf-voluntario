import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {ISFService} from './isf.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, public router: Router, private _isfService: ISFService) {

    }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const result = await this.auth.isLogin();
        console.log("Login: ", result);
        if (!result){
            this.auth.logout();
        }else{
            this._isfService.getMeUser();
        }
        return result;
    }
}
