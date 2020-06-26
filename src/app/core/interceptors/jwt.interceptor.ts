import { AuthService } from './../auth/auth.service';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // Adicionado o forwardRef para prevenir um erro https://github.com/angular/angular/issues/18224
    constructor(@Inject(forwardRef(() => AuthService)) private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `${this.auth.getToken()}`
            }
        });
        return next.handle(req);
    }
}
