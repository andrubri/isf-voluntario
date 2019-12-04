import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import {from} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.isLoginInterceptor().pipe(
            take(1),
            switchMap(idToken => {
                let clone = request.clone();
                if (idToken) {
                    clone = clone.clone({headers: request.headers.set('Authorization', 'Bearer ' + idToken)});
                }
                return next.handle(clone);
            })
        );
    }
}
