import { AuthService } from './../auth/auth.service';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Adiciona no Header de todas as chamadas para o Backend o token do usuário logado
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    // Adicionado o forwardRef para prevenir um erro https://github.com/angular/angular/issues/18224
    constructor(@Inject(forwardRef(() => AuthService)) private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.auth.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = req.url.startsWith(`${environment.api.baseUrl}`);

        console.log('JWTIncerceptor: ' + JSON.stringify(user));

        if (isLoggedIn && isApiUrl) {
            req = req.clone({
                setHeaders: { Authorization: `${this.auth.getToken()}` }

                // Também pode ser pegado o token pelo usuário e não pelo Cookie igual acima
                // setHeaders: { Authorization: `${user.token}` }
            });
        }
        return next.handle(req);
    }
}
