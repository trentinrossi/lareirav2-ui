import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CredenciaisDTO } from 'src/app/shared/models/credenciais.dto';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    creds: CredenciaisDTO = {
        email: '',
        senha: ''
    };

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    login() {
        this.auth.login(this.creds)
            .subscribe(response => {
                // console.log(response);

                this.router.navigate(['/']);
            });
    }
}
