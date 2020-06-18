import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
            {
                label: 'Cadastros', icon: 'fa fa-fw fa-bars',
                items: [
                    { label: 'Lareiras', icon: 'fa fa-fw fa-code', routerLink: ['/lareira'] },
                ]
            },
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
