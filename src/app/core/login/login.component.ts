import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ErrorHandlerService } from '../interceptors/error-interceptor';
import { CredenciaisDTO } from 'src/app/shared/models/credenciais.dto';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    creds: CredenciaisDTO = {
        email: 'cascavelsc@lareira.com',
        senha: '123'
    };

    constructor(
        private auth: AuthService,
        private errorHandler: ErrorHandlerService,
        private router: Router
    ) { }

    login(usuario: string, senha: string) {
        this.auth.authenticate(this.creds)
            .subscribe(response => {
                // console.log(response);

                this.router.navigate(['/']);
            });
    }
}
