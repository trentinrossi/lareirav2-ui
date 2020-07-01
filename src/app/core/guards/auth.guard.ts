import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.userValue;
        // console.log(user);

        if (user) {
            // console.log('Usuário logado: ' + user.nome);

            // Verifica se os perfis da rota corresponde a algum perfil do usuário logado
            for (const perfil of user.perfis) {
                if (route.data.perfis.indexOf(perfil) !== -1) {
                    return true;
                }
            }
            this.router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url } });
            return false;
        } else {
            // console.log('Não está logado');

            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
