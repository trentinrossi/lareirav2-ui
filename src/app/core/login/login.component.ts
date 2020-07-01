import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CredenciaisDTO } from 'src/app/shared/models/credenciais.dto';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    error = '';

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
            .pipe(first())
            .subscribe(
                response => {
                    // console.log(response);
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    this.error = error;
                    // this.loading = false;
                });
    }
}
