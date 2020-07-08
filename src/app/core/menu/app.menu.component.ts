import { MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserDTO } from 'src/app/shared/models/user.dto';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    modelAdmin: any[];
    modelCliente: any[];

    loggedUser: UserDTO;

    constructor(
        public app: AppComponent,
        private authService: AuthService) {
        this.loggedUser = this.authService.userValue;
    }

    ngOnInit() {
        this.modelAdmin = [
            { label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
            {
                label: 'Cadastros', icon: 'fa fa-fw fa-bars',
                items: [
                    { label: 'Lareiras', icon: 'fa fa-fw fa-code', routerLink: ['/lareira'] },
                    { label: 'Tipos de União', icon: 'fa fa-fw fa-code', routerLink: ['/tipo-uniao'] }
                ]
            },
            {
                label: 'Casais', icon: 'fa fa-fw fa-bars',
                items: [
                    { label: 'Cadastro', icon: 'fa fa-fw fa-code', routerLink: ['/casal'] }
                ]
            }
        ];

        this.modelCliente = [
            { label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
            {
                label: 'Casais', icon: 'fa fa-fw fa-bars',
                items: [
                    { label: 'Cadastro', icon: 'fa fa-fw fa-code', routerLink: ['/casal'] }
                ]
            }
        ];
    }

    changeTheme(theme: string, mode: string) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + theme + '.css';

        this.replaceLink(layoutLink, layoutHref);

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/theme-' + (mode ? theme + '-' + mode : theme) + '.css';

        this.replaceLink(themeLink, themeHref);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onMenuClick(event) {
        this.app.onMenuClick(event);
    }
}
