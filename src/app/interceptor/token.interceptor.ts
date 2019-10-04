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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.GetTokenFirebase().mergeMap((token: string) => {
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }

                return next.handle(request);
            });
    }
}
