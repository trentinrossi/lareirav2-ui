import { UserDTO } from './../../shared/models/user.dto';
import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    loggedUser: UserDTO;

    constructor(
        public app: AppComponent,
        private authService: AuthService
    ) {
        this.loggedUser = authService.userValue;
    }

    logout() {
        this.authService.logout();
    }
}
