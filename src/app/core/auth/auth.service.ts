import { UserDTO } from './../../shared/models/user.dto';
import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/app/shared/models/credenciais.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject: BehaviorSubject<UserDTO>;
    private refreshTokenTimeout;
    public user: Observable<UserDTO>;

    constructor(
        private router: Router,
        public http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<UserDTO>(JSON.parse(localStorage.getItem('loggedUser')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): UserDTO {
        return this.userSubject.value;
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    login(credenciais: CredenciaisDTO) {
        return this.http.post(`${environment.api.baseUrl}/login`, credenciais, { observe: 'response' })
            .pipe(map((res: any) => {
                // console.log(res);
                localStorage.setItem('token', res.headers.get('Authorization'));
                this.getUserByEmail(credenciais.email).subscribe(user => {
                    // console.log('Retornou usuário do e-mail: ' + user.email);
                    user.token = this.getToken();
                    localStorage.setItem('loggedUser', JSON.stringify(user));
                    this.userSubject.next(user);
                    this.startRefreshTokenTimer();
                    return user;
                });
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    // User profile
    getUserByEmail(email: string) {
        // Necessário adicionar aqui o Token pq o JWTInterceptor ainda não conhece o usuário logado
        const headers = new HttpHeaders({
            Authorization: this.getToken()
        });

        return this.http.get<UserDTO>(`${environment.api.baseUrl}/usuarios/email?value=${email}`, { headers });
    }

    refreshToken() {
        return this.http.post<any>(`${environment.api.baseUrl}/auth/refresh-token`, {}, { withCredentials: true })
            .pipe(map((user) => {
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
