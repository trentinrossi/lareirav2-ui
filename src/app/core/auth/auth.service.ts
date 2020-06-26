import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/app/shared/models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public http: HttpClient
    ) { }

    authenticate(credenciais: CredenciaisDTO) {
        return this.http.post(`${environment.api.baseUrl}/login`, credenciais)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }));
    }
}
