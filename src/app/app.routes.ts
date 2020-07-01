import { ForbiddenComponent } from './demo/view/forbidden.component';
import { LoginComponent } from './core/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: './features/dashboard/dashboard.module#DashboardModule' },
    { path: 'lareira', loadChildren: './features/lareira/lareira.module#LareiraModule' },
    { path: 'casal', loadChildren: './features/casal/casal.module#CasalModule' },
    { path: 'login', component: LoginComponent },
    { path: 'forbidden', component: ForbiddenComponent },

    { path: '**', redirectTo: '/dashboard' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
